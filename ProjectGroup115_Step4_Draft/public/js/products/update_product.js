// Get the objects we need to modify
let updatePersonForm = document.getElementById('update-product-form-ajax');

// Modify the objects we need
updatePersonForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputItemID = document.getElementById("prodSelect");
    let inputPrice = document.getElementById("input-price-update");

    console.log(inputItemID)
    console.log(inputPrice)

    // Get the values from the form fields
    let itemIDValue = inputItemID.value;
    let priceValue = inputPrice.value;

    console.log(itemIDValue)
    console.log(priceValue)
    
    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld

    if (isNaN(priceValue)) 
    {
        return;
    }


    // Put our data we want to send in a javascript object
    let data = {
        productID: itemIDValue,
        price: Number(priceValue)
    }

    console.log("Data to send:", data);
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-product-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            console.log("Response received:", xhttp.response);

            // Add the new data to the table
            updateRow(xhttp.response, itemIDValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, productID){
    let parsedData = JSON.parse(data);

    console.log(parsedData)
    
    let table = document.getElementById("products-tbody");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == productID) {


            // Get the location of the row where we found the matching product ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            console.log(updateRowIndex)

            // Get td of price value
            let td = updateRowIndex.getElementsByTagName("td")[4]; // Make sure Index matches row in Table;

            console.log(td)

            // Reassign Price to our value we updated to
            td.innerHTML = parsedData.price; 

            console.log(parsedData.price)
       }
    }
}