// from data.js
var tableData = data;
// YOUR CODE HERE!
let table_data = data;
// define a function to create the unique list
function unique_list(index){
    return Array.from(new Set((index)));
}

// make the data for all filters: date, city, state, country, shape
let date_all = unique_list(table_data.map(table_data => table_data.OverallQual))
let city_all = unique_list(table_data.map(table_data => table_data.GrLivArea))
let state_all = unique_list(table_data.map(table_data => table_data.GarageCars))
let country_all = unique_list(table_data.map(table_data => table_data.GarageArea))
let shape_all = unique_list(table_data.map(table_data => table_data.TotalBsmtSF))
// make list for filter and a "place_holder" to loop and add all options
const filter_list = [date_all, city_all, state_all, country_all, shape_all]
const place_holder = ['OverallQual', 'GrLivArea', 'GarageCars', 'GarageArea', 'TotalBsmtSF']
// to add all date options to the list because it is sorted, so it is not necessary to sort
filter_list[0].splice(0, 0, place_holder[0])
// use a loop to sort and add all other options to a list
for (let i = 1; i < 5; i++){
    filter_list[i].sort()
    filter_list[i].splice(0, 0, place_holder[i])
}
// make a filter to make a list
const filter_all = ['OverallQual', 'GrLivArea', 'GarageCars', 'GarageArea', 'TotalBsmtSF'];

// add all the options to selects and add a index to simplify the later code

for (let i = 0; i < 5; i++){
    const filter_ele = filter_all[i]
    const list_ele = filter_list[i]
    j = 0
    list_ele.forEach((ele) => {
        let select = document.getElementById(filter_ele);
        let option = document.createElement('option');
        option.text = ele;
        option.value = j;
        j = j + 1;
        select.add(option);
    })
}
// make a dictionary to store all index
let index_total = {OverallQual: 0, GrLivArea: 0, GarageCars: 0, GarageArea: 0, TotalBsmtSF: 0};

// make the data array based on dictionary with index
function remake_data(index_dict){
    // make a dynamic data as a template varible inside
    let dynamic_data = table_data;
    // run a loop to go through the index_dict
    for (let i = 0; i < 5; i++){
        let order = filter_all[i]
        const date_input = index_dict[order];
        // if any selection changed it will change the table
        if (date_input != 0){
            let temp_list = [];
            // use a loop to generate the new table
            for (let k = 0; k < dynamic_data.length; k++){
                let datas = dynamic_data[k];
                let datetime_inside = datas[order];
                if (datetime_inside === filter_list[i][date_input]){
                    temp_list.push(datas)
                }
            }
            dynamic_data = temp_list
        }
    }
    return dynamic_data;
}

// key function to make and fresh the table
function maketable(data){
    // find the table
    let table = document.getElementById('ufo-table');
    // find the tag: tr
    let rowtable = table.getElementsByTagName('tr');
    // get the length of the row
    let rowCount = rowtable.length; 
    // use the delete method to delete all existed rows as a refreshment
    for (let x = rowCount - 1; x > 0; x--){
        table.deleteRow(x);
    }
    // loop the data to make the new table
    data.forEach((UFO) => {
        var tableRef = table.getElementsByTagName('tbody')[0];
        let newRow = tableRef.insertRow(tableRef.rows.length);
        let content = ""
        for (key in UFO){
            content = content + '<td>' + UFO[key] + '</td>'
        }
        newRow.innerHTML = content
    })
}

maketable(table_data)

// make the function to collect the selection result
function select_date()
{
    const select_value = document.getElementById('OverallQual').value;
    index_total.OverallQual = parseInt(select_value);
    maketable(remake_data(index_total));
}

function select_city()
{
    const select_value = document.getElementById('GrLivArea').value;
    index_total.GrLivArea = parseInt(select_value);
    maketable(remake_data(index_total));
}

function select_state()
{
    const select_value = document.getElementById('GarageCars').value;
    index_total.GarageCars = parseInt(select_value);
    maketable(remake_data(index_total));
}

function select_country()
{
    const select_value = document.getElementById('GarageArea').value;
    index_total.GarageArea = parseInt(select_value);
    maketable(remake_data(index_total));
}

function select_shape()
{
    const select_value = document.getElementById('TotalBsmtSF').value;
    index_total.TotalBsmtSF = parseInt(select_value);
    maketable(remake_data(index_total));
}

// make the function to reset the selection.
const reset_click = d3.select("#reset_button");
reset_click.on("click", function() {
    // Select the current count
    filter_all.forEach(function(name){
        const select_index = document.getElementById(name);
        select_index.selectedIndex = 0;
    })
    index_total = {OverallQual: 0, GrLivArea: 0, GarageCars: 0, GarageArea: 0, TotalBsmtSF: 0};
    maketable(table_data)
});