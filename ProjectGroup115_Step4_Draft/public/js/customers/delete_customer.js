
function deleteCustomer(custID) {
    // Put our data we want to send in a javascript object
    let data = {
        customerID: custID
    };
   
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-customer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Add the new data to the table
            deleteRow(custID);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}


function deleteRow(custID){
   let table = document.getElementById("customers-tbody");
   for (let i = 0, row; row = table.rows[i]; i++) {
      //iterate through rows
      //rows would be accessed using the "row" variable assigned in the for loop
      if (table.rows[i].getAttribute("data-value") == custID) {
           table.deleteRow(i);
           deleteDropDownMenu(custID);
           break;
      }
   }
}

function deleteDropDownMenu(custID){
 let selectMenu = document.getElementById("custSelect");
 for (let i = 0; i < selectMenu.length; i++){
   if (Number(selectMenu.options[i].value) === Number(custID)){
     selectMenu[i].remove();
     break;
   } 
 }
}