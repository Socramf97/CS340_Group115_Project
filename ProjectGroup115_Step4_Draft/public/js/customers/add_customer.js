// Get the objects we need to modify
let addCustomerForm = document.getElementById('add-customer-form-ajax');

// Modify the objects we need
addCustomerForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputCustomerName = document.getElementById("input-custname");
    let inputCustomerType = document.getElementById("input-custtype");
    let inputCustomerRace = document.getElementById("input-custrace");
    let inputEmployeeID = document.getElementById("empSelect");


    // Get the values from the form fields
    let customerNameValue = inputCustomerName.value;
    let customerTypeValue = inputCustomerType.value;
    let customerRaceValue = inputCustomerRace.value;
    let employeeIDValue = inputEmployeeID.value;
 

    // Put our data we want to send in a javascript object
    let data = {
        customerName: customerNameValue,
        customerType: customerTypeValue,
        customerRace: customerRaceValue,
        employeeID: employeeIDValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-customer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Add new product to the dropdown
            let parsedData = JSON.parse(xhttp.response); // response = entire products table
            let latestCustomer = parsedData[parsedData.length - 1]; // Get the last added product
            addDropDownMenu(latestCustomer);

            // Clear the input fields for another transaction
            inputCustomerName.value = '';
            inputCustomerType.value = '';
            inputCustomerRace.value = '';
            inputEmployeeID.value = '';

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
    let currentTable = document.getElementById("customers-tbody");

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    row.setAttribute("data-value", newRow.customerID); // Set the data-value to the productID
    let idCell = document.createElement("TD");
    let customerNameCell = document.createElement("TD");
    let customerTypeCell = document.createElement("TD");
    let customerRaceCell = document.createElement("TD");
    let employeeIDCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.customerID;
    customerNameCell.innerText = newRow.customerName;
    customerTypeCell.innerText = newRow.customerType;
    customerRaceCell.innerText = newRow.customerRace;
    employeeIDCell.innerText = newRow.employeeID;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deletecustomer(newRow.customerID);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(customerNameCell);
    row.appendChild(customerTypeCell);
    row.appendChild(customerRaceCell);
    row.appendChild(employeeIDCell);

    row.appendChild(deleteCell);

    // Add the row to the table
    currentTable.appendChild(row);
}

function addDropDownMenu(customer){
    let selectMenu = document.getElementById("custSelect");

    // Create a new option element
    let newOption = document.createElement("option");
    newOption.value = customer.customerID; // Set the value to the product's ID
    newOption.textContent = customer.customerName; // Set the text to the product's name

    // Append the new option to the dropdown menu
    selectMenu.appendChild(newOption);
}