/**
 * ECS 193A Inventory Tracking
 *
 * status of project:
 * This project currently has the ability to connect to database (MySQL) server that communicates with nodejs (backend) server.
 * Has functions that can query database through submit buttons. Currently there are only insert and delete queries. Buttons now
 * update page when pressed and no refreshing required.
 *
 * We have the homepage set to home.html which provides us a form to fill out user information. This information is linked to a
 * submit button which is implemented to send data to our backend through to the database.
 *
 * Our Angular (frontend) has the capability to retrieve information from the nodejs server by importing a json file that is sent
 * out through the bodyparser module. The information from the database can be seen under the form when you load the page.
 *
 * when submitting information in the form on the webpage home.html, it actively updates the entries shown on the page
 *
 * when deleting, it deletes ALL entries in the database. This is for testing purposes only. We need to implement a future
 * delete button that will delete based on specified information.
 *
 * There was a temporary deleteAll query added to the program to implement this test.
 *
 * TODO:
 * We can experiment with bootstrap on the forms for now
 *
 * create a plan for buttons that can manipulate the database using queries. These buttons can delete based on specified
 * information, Update user information.
 *
 * We want to separate home.html into two files. There exists a home.js, but it isn't up to date with home.html. I've
 * struggled to separate the home.html file into a .js for some reason. This should be a simple fix, but is now a priority
 *
 */

//express module. serves the job for fd and html, makes code more managable.
var express = require ('express');
//handles directory pathing, not implemented, but we will need to use this in the future
var path = require('path');
//mysql module, allows for database access.
var mysql = require ('mysql');
//router (not yet used)
var router = express.Router();
//body parser
var bodyParser = require('body-parser');


//good practice when setting up port.
var PORT = process.env.PORT || 3005;

//mysql connection through mysql workbench server
var connection = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: ''
});
//connects to mysql server
connection.connect(function(err){
    if(err){
        console.log('Error connecting to database');
        return;
    }
    console.log('Connection to database established');
});

//creates express object
var app = express();
//sets up json generator through body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//mysql insert query function. Takes in table name, and entry of data
var insertQuery = function(table,entry) {
    connection.query('INSERT INTO ' + table + ' SET ?', entry, function(err,res){
        if(err){
            console.log('Error in insertQuery');
            return;
        }
        console.log('Last insert ID:', res.insertId);
    })
};

//variable that needs to be encapsulated by select query. Its out here for testing purposes.
var jsonQuery;
//mysql select query function. Selects from a table.
var selectQuery = function(table) {
    connection.query('SELECT * FROM ' + table,function(err,rows){
        if(err){
            console.log('Error in selectQuery');
            return;
        }
        console.log('Data received from Db:\n');
        jsonQuery = rows; //the jsonQuery variable from above.
    })
};
//mysql delete query function. Deletes from a table by id (not yet used)
var deleteQuery = function(table,id) {
    connection.query('DELETE FROM ' + table + ' WHERE id = ?', id, function (err, result) {
        if (err) {
            console.log('Error in deleteQuery');
            return;
        }
        console.log('Deleted ' + result.affectedRows + ' rows');
    })
};


//mysql delete all query function. Dangerous function, deletes all entries. This is only here for testing purposes.
var deleteAllQuery = function(table) {
    connection.query('DELETE FROM ' + table, function (err, result) {
        if (err) {
            console.log('Error in deleteQuery');
            return;
        }
        console.log('Deleted ' + result.affectedRows + ' rows');
    })
};
//mysql update query function. (not yet used)
var updateQuery = function(table,dataType,dataName,id) {
    connection.query('UPDATE ' + table + ' SET ' + dataType + ' = ? Where ID = ?',[dataName,id], function(err, result){
        if(err) {
            console.log('Error in updateQuery');
            return;
        }
        console.log('Changed ' + result.changedRows + ' rows');
    })
};

//below are some hardcoded examples of querying the database that will be further implemented.
//updateQuery('Persons', 'firstName', 'Joseph', 12);
//insertQuery('Persons', data[0]);
//deleteQuery('Persons',[11]);


//this inserts into database from angular front end
app.post('/insert', function(req,res,next){
    var entry = req.body;
    insertQuery('Persons',entry);


});

//this deletes every entry in the database. Dangerous use, needs to specify what to delete for future.
app.post('/delete', function(req,res,next){
    var entry = req.body;
    deleteAllQuery('Persons',entry);
});

//home, access by localhost:3003
//home is set up to enter in a data entry, but does not record it yet.
app.get('/', function(req,res){
    selectQuery('Persons');
    res.sendFile(path.join(__dirname + '/home.html'));
    console.log("/ request");
});

//this takes you to the login page at /index.html. This hasn't been implemented yet to be functional
app.get('/login', function(req,res){
    res.sendFile(path.join(__dirname + '/index.html'));
    console.log("/login request");
});

//passes jsonQuery object to the front-end. This object holds the json information of the database through selectQuery
app.get('/data', function(req,res){
    res.json(jsonQuery);
    console.log("/data request");
});

//bootstrap example, access by localhost:3003/bootex
app.get('/bootex', function(req,res){
    res.sendFile(path.join(__dirname + '/bootstrap.html'));
    console.log("/bootex request");
});

//error 404
app.get('*', function(req,res){
    res.send("Error, this is not a page you are looking for");
});

//this boots up the server and listens on port 3003
app.listen(PORT, function() {
    console.log("Server running on " + PORT);
});

