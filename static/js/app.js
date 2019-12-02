
function updatePlotly(data_index){
  Plotly.d3.csv("../static/data/train.csv", function(err, rows){
  function unpack(rows, key) {
    return rows.map(function(row) { return row[key]; });
    }

  var data = [{
    type: 'violin',
    x: unpack(rows, data_index),
    y: unpack(rows, 'SalePrice'),
    points: 'none',
    box: {visible: true},
    line: {color: 'skyblue'},
    meanline: {visible: true},
    transforms: [{type: 'groupby',groups: unpack(rows, data_index),}]
  }]

  var layout = {
    title: `Multiple Traces Violin Plot for ${data_index}`,
    yaxis: {
      zeroline: false
    }
  }

  Plotly.newPlot('bubble', data, layout);
  });
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");
  // Use the list of sample names to populate the select options
  d3.json("/cat_list").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
    updatePlotly(sampleNames[0])
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  updatePlotly(newSample);
}

// Initialize the dashboard
init();
