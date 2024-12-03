// Get the objects we need to modify
let updateEmployeeForm = document.getElementById('update-employee-form-ajax');

// Modify the objects we need
updateEmployeeForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputEmployeeID = document.getElementById("empSelect");
    let inputEmployeeRace = document.getElementById("input-race-update");


    // Get the values from the form fields
    let employeeIDValue = inputEmployeeID.value;
    let employeeRaceValue = inputEmployeeRace.value;

    console.log(employeeIDValue)
    console.log(employeeRaceValue)


    // Put our data we want to send in a javascript object
    let data = {
        employeeID: employeeIDValue,
        employeeRace: employeeRaceValue
    }

    console.log("Data to send:", data);
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-employee-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            console.log("Response received:", xhttp.response);

            // Add the new data to the table
            updateRow(xhttp.response, employeeIDValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, employeeID){
    let parsedData = JSON.parse(data);

    console.log(parsedData)
    
    let table = document.getElementById("employees-tbody");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == employeeID) {


            // Get the location of the row where we found the matching product ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            console.log(updateRowIndex)

            // Get td of price value
            let td = updateRowIndex.getElementsByTagName("td")[2]; // Make sure Index matches row in Table;

            console.log(td)

            // Reassign Price to our value we updated to
            td.innerHTML = parsedData.employeeRace; 

            console.log(parsedData.employeeRace)
       }
    }
}