var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
//mysql module, allows for database access.
var mysql = require ('mysql');
var morgan = require('morgan');
// var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();
var appRoutes = require('./app/routes/api')(router);
var path = require('path');

//order of middleware is important. Need to parse json before routing. 
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public')); //static file location of public for frontend files
app.use('/api', appRoutes); // /api deconflicts the backend from frontend routes. 


//mysql connection through mysql workbench server
var connection = mysql.createConnection({
    host: 'ecs193instancedb.chg90xdsb0jq.us-west-1.rds.amazonaws.com',
    user: 'ecs193db',
    password: 'Commentecs193',
    database: 'Inventory_Tracking_193'
});

// mongoose.connect('mongodb://localhost:27017/tutorial', function(err) {
// 	if(err){
// 		console.log('Not connected to the database: ' + err);
// 	} else {
// 		console.log('Successfully connected to MongoDB');
// 	}
// });

//connects to mysql server
connection.connect(function(err){
    if(err){
        console.log('Error connecting to database');
        return;
    }
    console.log('Connection to database established');
});

app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.listen(port, function(){
	console.log('Running the server on port ' + port);
});