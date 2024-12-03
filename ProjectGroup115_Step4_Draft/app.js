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
   INDEX ROUTES
*/
app.get('/', function(req, res) {
    res.render('index'); // Render a 'index.hbs' template for the landing page
});

/*
    PRODUCT ROUTES
*/

// GET ROUTE: RETURNS SEARCH RESULTS AND RENDERS PRODUCTS PAGE
app.get('/products', function(req, res)
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

        return res.render('products', {data: items});
    })
})

// POST ROUTE: Adds products to DB
app.post('/add-product-ajax', function(req, res) 
{
    
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

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

// Updates Product to DB
app.put('/put-product-ajax', function(req,res,next){
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
    EMPLOYEES ROUTES
*/
// GET ROUTE: RETURNS SEARCH RESULTS AND RENDERS EMPLOYEES PAGE
app.get('/employees', function(req, res)
{
    let query1;

    if (req.query.employeeName === undefined)
    {
        query1 = "SELECT * FROM Employees;";
    }

    else
    {
        query1 = `SELECT * FROM Employees WHERE employeeName LIKE "${req.query.employeeName}%"`
    }

     // Run the 1st query
     db.pool.query(query1, function(error, rows, fields){
        
        // Save the Employees
        let employees = rows;

        return res.render('employees', {data: employees});
    })
})

// POST ROUTES

// Adds employee to DB
app.post('/add-employee-ajax', function(req, res) 
{
    
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    /* NOT NEEDED FOR EMPLOYEES SINCE NULL IS NOT ALLOWED, keeping because we will need it for SalesOrders

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
    query1 = `INSERT INTO Employees (employeeName, employeeRace) VALUES ('${data.employeeName}', '${data.employeeRace}')`;
    db.pool.query(query1, function(error, rows, fields){ 

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on Employees
            query2 = `SELECT * FROM Employees;`;
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


// Deletes Employee from DB
app.delete('/delete-employee-ajax/', function(req,res,next){
    let data = req.body;
    let employeeID = parseInt(data.employeeID);
    let deleteEmployee= `DELETE FROM Employees WHERE employeeID = ?`;
        // Run the first query
        db.pool.query(deleteEmployee, [employeeID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    })
});

// Updates Employee to DB
app.put('/put-employee-ajax', function(req,res,next){
    let data = req.body;
    console.log("PUT Request Received with:", req.body);
    let employeeRace = data.employeeRace;
    let employeeID = parseInt(data.employeeID);
    let queryUpdateEmployee = `UPDATE Employees SET employeeRace = ? WHERE Employees.employeeID = ?`;
    let selectEmployee = `SELECT * FROM Employees WHERE employeeID = ?`;
    // Run the 1st query
    db.pool.query(queryUpdateEmployee, [employeeRace, employeeID], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            // Run the second query to fetch updated data
            db.pool.query(selectEmployee, [employeeID], function (error, rows, fields) {
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
    CUSTOMERS ROUTES
*/


// GET ROUTE: RETURNS SEARCH RESULTS AND RENDERS CUSTOMERS PAGE
app.get('/customers', function(req, res)
{
    let query1;
    let employeesQuery = "SELECT * FROM Employees;";

    if (req.query.customerName === undefined)
    {
        query1 = "SELECT * FROM Customers;";
    }

    else
    {
        query1 = `SELECT * FROM Customers WHERE customerName LIKE "${req.query.customerName}%"`
    }

    db.pool.query(employeesQuery, function(employeesError, employeesRows, employeesFields) {
    if (employeesError) {
        console.error("Error fetching employees:", employeesError);
        res.sendStatus(500);
        return;
    }

     // Run the 1st query
     db.pool.query(query1, function(error, rows, fields){
        
        // Save the customers
        let customers = rows;

        return res.render('customers', {
            data: customers,
            employees: employeesRows
        });
     })
  });     
})

// POST ROUTES

// Adds customer to DB
app.post('/add-customer-ajax', function(req, res) 
{
    
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    /// Capture NULL values
    let employeeID = parseInt(data.employeeID);
    // OPTIONAL FIX IN CASE NaN doesn't work
    //if (selectedEmployeeID === "") {
    //selectedEmployeeID = null;
    
    if (isNaN(employeeID))     
    {
        employeeID = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Customers (customerName, customerType, customerRace, employeeID) VALUES ('${data.customerName}', '${data.customerType}', '${data.customerRace}', ${data.employeeID})`;
    db.pool.query(query1, function(error, rows, fields){ 

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on Customers to display updated table
            query2 = `SELECT * FROM Customers;`;
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


// Deletes customer from DB
app.delete('/delete-customer-ajax/', function(req,res,next){
    let data = req.body;
    let customerID = parseInt(data.customerID);
    let deleteCustomer= `DELETE FROM Customers WHERE customerID = ?`;
        // Run the first query
        db.pool.query(deleteCustomer, [customerID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    })
});

// Updates customer to DB
app.put('/put-customer-ajax', function(req,res,next){
    let data = req.body;
    console.log("PUT Request Received with:", req.body);
    let customerType = data.customerType;
    let customerID = parseInt(data.customerID);
    let queryUpdateCustomer = `UPDATE Customers SET customerType = ? WHERE Customers.customerID = ?`;
    let selectCustomer = `SELECT * FROM Customers WHERE customerID = ?`;
    // Run the 1st query
    db.pool.query(queryUpdateCustomer, [customerType, customerID], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            // Run the second query to fetch updated data
            db.pool.query(selectCustomer, [customerID], function (error, rows, fields) {
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
    SALES ORDERS ROUTES
*/

app.get('/sales_orders', function(req, res) {
    res.render('sales_orders'); // Render a 'index.hbs' template for the landing page
});

/*
    ORDER PRODUCTS ROUTES
*/

app.get('/order_products', function(req, res) {
    res.render('order_products'); // Render a 'order_products.hbs' template for the landing page
});


/*
    LISTENER
*/
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
