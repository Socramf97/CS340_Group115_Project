/*
    SETUP
*/

// Express
var express = require('express');
var app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
PORT = 54544;

// Database
var db = require('./database/db-connector');

// Handlebars
var { create } = require('express-handlebars');
const hbs = create({ extname: ".hbs" });
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

// Static Files
app.use(express.static('public'));

/*
    ROUTES
*/

// GET ROUTES

// RETURNS SEARCH RESULTS
app.get('/', function(req, res)
{
    let query1;

    if (req.query.itemName === undefined)
    {
        query1 = "SELECT * FROM Products;";
    }

    else
    {
        query1 = `SELECT * FROM Products WHERE itemName LIKE "${req.query.itemName}%"`
    }

     // Run the 1st query
     db.pool.query(query1, function(error, rows, fields){
        
        // Save the items
        let items = rows;

        return res.render('index', {data: items});
    })
})

// POST ROUTES

// Adds products to DB
app.post('/add-product-ajax', function(req, res) 
{
    
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    /* NOT NEEDED FOR PRODUCTS SINCE NULL IS NOT ALLOWED, keeping because we will need it for SalesOrders

    /// Capture NULL values
    let homeworld = parseInt(data.homeworld);
    if (isNaN(homeworld))
    {
        homeworld = 'NULL'
    }

    let age = parseInt(data.age);
    if (isNaN(age))
    {
        age = 'NULL'
    }
    */

    // Create the query and run it on the database
    query1 = `INSERT INTO Products (itemName, itemType, itemRarity, price, quantityStocked) VALUES ('${data.itemName}', '${data.itemType}', '${data.itemRarity}', ${data.price}, ${data.quantityStocked})`;
    db.pool.query(query1, function(error, rows, fields){ 

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on Products
            query2 = `SELECT * FROM Products;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

// Deletes Product from DB
app.delete('/delete-product-ajax/', function(req,res,next){
    let data = req.body;
    let itemID = parseInt(data.productID);
    let deleteProducts= `DELETE FROM Products WHERE productID = ?`;
        // Run the first query
        db.pool.query(deleteProducts, [itemID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    })
});

// Updates Product to DB WORK IN PROGRESS 
app.put('/put-product-ajax', function(req,res,next){
    console.log("PUT Request Received");
    let data = req.body;
    console.log("PUT Request Received with:", req.body);
    let price = parseInt(data.price);
    let productID = parseInt(data.productID);
    let queryUpdateProduct = `UPDATE Products SET price = ? WHERE Products.productID = ?`;
    let selectProduct = `SELECT * FROM Products WHERE productID = ?`;
    // Run the 1st query
    db.pool.query(queryUpdateProduct, [price, productID], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            // Run the second query to fetch updated data
            db.pool.query(selectProduct, [productID], function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.json(rows[0]); // Send the updated row as a JSON object
                }
            });
        }
    });
});

/*
    LISTENER
*/
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
