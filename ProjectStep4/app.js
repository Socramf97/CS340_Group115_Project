/*
    SETUP
*/

// Express
var express = require('express');
var app = express();
PORT = 9124;

// Database
var db = require('./database/db-connector');

// Handlebars
var { create } = require('express-handlebars');
const hbs = create({ extname: ".hbs" });
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

/*
    ROUTES
*/
app.get('/', function(req, res)
    {
        let query1 = "SELECT * FROM Products;";
        db.pool.query(query1, function(error, rows, fields){
            res.render('index', {data: rows});
        })
    });

/*
    LISTENER
*/
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
