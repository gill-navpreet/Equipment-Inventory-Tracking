//express module. serves the job for fd and html, makes code more managable.
var express = require ('express');
//handles directory pathing
var path = require('path');
//mysql module, allows for database access.
var mysql = require ('mysql');


//mysql connection through mysql workbench server
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ecs193@@',
    database: 'inventory'
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

//data for entries. this needs to be stored in a json file that will be updated between front
//end and backend.
var data = [
    {
        id: null,
        firstName: 'Sean',
        lastName: 'Moody',
        studentID: 45454545,
        item: 'mouse',
        qrlCode: 9382792,
        checkOutTime: 600
    },
    {
        id: null,
        firstName: 'Weston',
        lastName: 'Moody',
        studentID: 78787878,
        item: 'keyboard',
        qrlCode: 9377777,
        checkOutTime: 700
    }
];
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
//mysql select query function. Selects from a table.
var selectQuery = function(table) {
    connection.query('SELECT * FROM ' + table,function(err,rows){
        if(err){
            console.log('Error in selectQuery');
            return;
        }
        console.log('Data received from Db:\n');
        console.log(rows);
    })
};
//mysql delete query function. Deletes from a table by id
var deleteQuery = function(table,id) {
    connection.query('DELETE FROM ' + table + ' WHERE id = ?', id, function (err, result) {
        if (err) {
            console.log('Error in deleteQuery');
            return;
        }
        console.log('Deleted ' + result.affectedRows + ' rows');
    })
};
//mysql update query function.
var updateQuery = function(table,dataType,dataName,id) {
    connection.query('UPDATE ' + table + ' SET ' + dataType + ' = ? Where ID = ?',[dataName,id], function(err, result){
        if(err) {
            console.log('Error in updateQuery');
            return;
        }
        console.log('Changed ' + result.changedRows + ' rows');
    })
};

//updateQuery('inventory', 'firstName', 'Joseph', 12);
//insertQuery('inventory', data[0]);
//deleteQuery('inventory',[11]);
//selectQuery('inventory');


//home, access by localhost:3000
//home is set up to enter in a data entry, but does not record it yet.
app.get('/', function(req,res){
    res.sendFile(path.join(__dirname + '/index.html'));
    console.log("/ request");
});



//bootstrap example, access by localhost:3000/bootex
app.get('/bootex', function(req,res){
    res.sendFile(path.join(__dirname + '/bootstrap.html'));
    console.log("/bootex request");
});

//error 404
app.get('*', function(req,res){
    res.send("Error, this is not a page you are looking for");
});

//this boots up the server and listens on port 3000
app.listen(3000, function() {
    console.log("Server is now running on localhost:3000");
});

