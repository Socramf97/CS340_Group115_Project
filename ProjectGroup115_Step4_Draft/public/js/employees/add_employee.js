// Get the objects we need to modify
let addProductForm = document.getElementById('add-employee-form-ajax');

// Modify the objects we need
addProductForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputEmployeeName = document.getElementById("input-empname");
    let inputEmployeeRace = document.getElementById("input-race");


    // Get the values from the form fields
    let employeeNameValue = inputEmployeeName.value;
    let employeeRaceValue = inputEmployeeRace.value;
 

    // Put our data we want to send in a javascript object
    let data = {
        employeeName: employeeNameValue,
        employeeRace: employeeRaceValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-employee-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Add new product to the dropdown
            let parsedData = JSON.parse(xhttp.response); // response = entire products table
            let latestProduct = parsedData[parsedData.length - 1]; // Get the last added product
            addDropDownMenu(latestProduct);

            // Clear the input fields for another transaction
            inputEmployeeName.value = '';
            inputEmployeeRace.value = '';

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// products
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("employees-tbody");

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    row.setAttribute("data-value", newRow.employeeID); // Set the data-value to the productID
    let idCell = document.createElement("TD");
    let employeeNameCell = document.createElement("TD");
    let employeeRaceCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.employeeID;
    employeeNameCell.innerText = newRow.employeeName;
    employeeRaceCell.innerText = newRow.employeeRace;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteEmployee(newRow.employeeID);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(employeeNameCell);
    row.appendChild(employeeRaceCell);
    row.appendChild(deleteCell);

    // Add the row to the table
    currentTable.appendChild(row);
}

function addDropDownMenu(employee){
    let selectMenu = document.getElementById("empSelect");

    // Create a new option element
    let newOption = document.createElement("option");
    newOption.value = employee.employeeID; // Set the value to the product's ID
    newOption.textContent = employee.employeeName; // Set the text to the product's name

    // Append the new option to the dropdown menu
    selectMenu.appendChild(newOption);
}