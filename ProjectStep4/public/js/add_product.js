// Get the objects we need to modify
let addProductForm = document.getElementById('add-product-form-ajax');

// Modify the objects we need
addProductForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputItemName = document.getElementById("input-name");
    let inputItemType = document.getElementById("input-type");
    let inputItemRarity= document.getElementById("input-rarity");
    let inputPrice = document.getElementById("input-price");
    let inputQuantity = document.getElementById("input-quantity");

    // Get the values from the form fields
    let itemNameValue = inputItemName.value;
    let itemTypeValue = inputItemType.value;
    let itemRarityValue = inputItemRarity.value;
    let priceValue = inputPrice.value;
    let quantityValue = inputQuantity.value;

    // Put our data we want to send in a javascript object
    let data = {
        itemName: itemNameValue,
        itemType: itemTypeValue,
        itemRarity: itemRarityValue,
        price: Number(priceValue),
        quantityStocked: Number(quantityValue)
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-product-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputItemName.value = '';
            inputItemType.value = '';
            inputItemRarity.value = '';
            inputPrice.value = '';
            inputQuantity.value = '';
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
    let currentTable = document.getElementById("products-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let itemNameCell = document.createElement("TD");
    let itemTypeCell = document.createElement("TD");
    let itemRarityCell = document.createElement("TD");
    let priceCell = document.createElement("TD");
    let quantityStockedCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.productID;
    itemNameCell.innerText = newRow.itemName;
    itemTypeCell.innerText = newRow.itemType;
    itemRarityCell.innerText = newRow.itemRarity;
    priceCell.innerText = newRow.price;
    quantityStockedCell.innerText = newRow.quantityStocked;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteProduct(newRow.productID);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(itemNameCell);
    row.appendChild(itemTypeCell);
    row.appendChild(itemRarityCell);
    row.appendChild(priceCell);
    row.appendChild(quantityStockedCell);
    row.appendChild(deleteCell);
    
    // Add the row to the table
    currentTable.appendChild(row);
}