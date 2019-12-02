// @TODO: YOUR CODE HERE!
(async function(){
    const init_data = await d3.csv("static/data/train.csv");
    init_data.forEach(function(data) {
        data.SalePrice = +data.SalePrice;
        data.GarageArea = +data.GarageArea;
        data.TotalBsmtSF = +data.TotalBsmtSF;
        data.FstFlrSF = +data.FstFlrSF;
        data.YearBuilt = +data.YearBuilt;

    });

    const svgWidth = 960,
          svgHeight = 500;


    // Define the chart's margins as an object
    const margin = {top: 20, right: 60, bottom: 100, left: 100};

    // Define dimensions of the chart area
    const chartWidth = svgWidth - margin.left - margin.right;
    const chartHeight = svgHeight - margin.top - margin.bottom;

    // define the x_axis and y_axis
    let chosenXAxis = 'GarageArea';
    let chosenYAxis = 'SalePrice';
    const svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

    // Append a group area, then set its margins
    const chartGroup = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);

    // xScale for changing data
    function xScale(init_data, chosenXAxis) {
    // create scales
        let xLinearScale = d3.scaleLinear()
        .domain([d3.min(init_data, d => d[chosenXAxis]) * 0.99,
        d3.max(init_data, d => d[chosenXAxis]) * 1.01
        ])
        .range([0, chartWidth]);

        return xLinearScale;
    }
    // d3.extent returns the an array containing the min and max values for the property specified
    let xLinearScale = xScale(init_data, chosenXAxis);
    // yScale for changing data
    function yScale(init_data, chosenYAxis) {
        // create scales
        let yLinearScale = d3.scaleLinear()
        .domain([d3.min(init_data, d => d[chosenYAxis]) * 0.8,
        d3.max(init_data, d => d[chosenYAxis]) * 1.2
        ])
        .range([chartHeight, 0]);

        return yLinearScale;
    }
    // Configure a linear scale with a range between the chartHeight and 0
    let yLinearScale = yScale(init_data, chosenYAxis);

    // These will be used to create the chart's axes   
    const bottomAxis = d3.axisBottom(xLinearScale);
    const leftAxis = d3.axisLeft(yLinearScale);

    let xAxis = chartGroup.append("g")
                            .classed("x-axis", true)
                            .attr("transform", `translate(0, ${chartHeight})`)
                            .call(bottomAxis);


    let yAxis = chartGroup.append("g")
                            .classed("y-axis", true)
                            .call(leftAxis);

    // initial the circles group to show data at beginning
    let circlesGroup = chartGroup.selectAll("circle")
                            .data(init_data)
                            .enter()
                            .append("circle")
                            .attr("cx", d => xLinearScale(d[chosenXAxis]))
                            .attr("cy", d => yLinearScale(d[chosenYAxis]))
                            .attr("r", "4")
                            .attr("fill", "skyblue")
                            .attr("opacity", ".5");



    // X labeled
    const labelsGroup = chartGroup.append("g")
                        .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + 20})`);


    const GarageArea_label = labelsGroup.append("text")
                            .attr("x", 0)
                            .attr("y", 20)
                            .attr("value", "GarageArea") // value to grab for event listener
                            .classed("active", true)
                            .text("GarageArea");

    const TotalBsmtSF_label = labelsGroup.append("text")
                            .attr("x", 0)
                            .attr("y", 40)
                            .attr("value", "TotalBsmtSF") // value to grab for event listener
                            .classed("inactive", true)
                            .text("TotalBsmtSF");

    const FstFlrSF_label = labelsGroup.append("text")
                            .attr("x", 0)
                            .attr("y", 60)
                            .attr("value", "FstFlrSF") // value to grab for event listener
                            .classed("inactive", true)
                            .text("FstFlrSF");
    
    const YearBuilt_label = labelsGroup.append("text")
                            .attr("x", 0)
                            .attr("y", 80)
                            .attr("value", "YearBuilt") // value to grab for event listener
                            .classed("inactive", true)
                            .text("YearBuilt");


    // y labeled      
    const ylabelsGroup = chartGroup.append("g")
    .attr("transform", "rotate(-90)");
        
    const SalePrice_label = ylabelsGroup.append("text")
                            .attr("x", -170)
                            .attr("y", -55)
                            .attr("value", "SalePrice") // value to grab for event listener
                            .classed("active", true)
                            .text("SalePrice");




    // Initialize tool tip
    let toolTip = d3.tip()
            .attr("class", "tooltip")
            .offset([80, -60])
            .html(function(d) {
            return (`${chosenXAxis}: ${d[chosenXAxis]}<br>${chosenYAxis}: ${d[chosenYAxis]}`);
            });

    // Create tooltip in the chart
    chartGroup.call(toolTip);

    // Create event listeners to display and hide the tooltip
    circlesGroup.on("mouseover", function(data) {
        toolTip.show(data, this);
    })
    // onmouseout event
    .on("mouseout", function(data, index) {
        toolTip.hide(data);
    });

    // function of circles
    function renderCircles(circlesGroup, newXScale, chosenXaxis, chosenYaxis, newYScale) {

        circlesGroup.transition()
                .duration(1000)
                .attr("cx", d => newXScale(d[chosenXaxis]))
                .attr('cy', d => newYScale(d[chosenYaxis]));

            return circlesGroup;
    }



    // x render
    function xrenderAxes(newXScale, xAxis) {
        const bottomAxis = d3.axisBottom(newXScale);

        xAxis.transition()
        .duration(1000)
        .call(bottomAxis);

        return xAxis;
    }

    // y render
    function yrenderAxes(newXScale, yAxis) {
        const leftAxis = d3.axisLeft(newXScale);

        yAxis.transition()
        .duration(1000)
        .call(leftAxis);

        return yAxis;
    }


    // click on the x axis
    labelsGroup.selectAll("text")
        .on("click", function() {
            // get value of selection
            const value = d3.select(this).attr("value");
            if (value !== chosenXAxis) {
                chosenXAxis = value;

                xLinearScale = xScale(init_data, chosenXAxis);
                // function used for updating xAxis const upon click on axis label

                // updates x axis with transition
                xAxis = xrenderAxes(xLinearScale, xAxis);

                // updates circles with new x values
                circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis, chosenYAxis, yLinearScale);

                // changes classes to change bold text
            if (chosenXAxis === "GarageArea") {
                GarageArea_label
                    .classed("active", true)
                    .classed("inactive", false);
                TotalBsmtSF_label
                    .classed("active", false)
                    .classed("inactive", true);
                FstFlrSF_label
                    .classed("active", false)
                    .classed("inactive", true);
                YearBuilt_label
                    .classed("active", false)
                    .classed("inactive", true);
            }
            else if (chosenXAxis === 'TotalBsmtSF'){
                GarageArea_label
                    .classed("active", false)
                    .classed("inactive", true);
                TotalBsmtSF_label
                    .classed("active", true)
                    .classed("inactive", false);
                FstFlrSF_label
                    .classed("active", false)
                    .classed("inactive", true);
                YearBuilt_label
                    .classed("active", false)
                    .classed("inactive", true);
            }
            else if (chosenXAxis === 'FstFlrSF'){
                GarageArea_label
                    .classed("active", false)
                    .classed("inactive", true);
                TotalBsmtSF_label
                    .classed("active", false)
                    .classed("inactive", true);
                FstFlrSF_label
                    .classed("active", true)
                    .classed("inactive", false);
                YearBuilt_label
                    .classed("active", false)
                    .classed("inactive", true);
            }
            else {
                GarageArea_label
                    .classed("active", false)
                    .classed("inactive", true);
                TotalBsmtSF_label
                    .classed("active", false)
                    .classed("inactive", true);
                FstFlrSF_label
                    .classed("active", false)
                    .classed("inactive", true);
                YearBuilt_label
                    .classed("active", true)
                    .classed("inactive", false);
            }
        }
    });
})()


    