var http = require('http');
var fs = require('fs');
var mysql = require ('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ecs193@@',
    database: 'inventorytracking'
});

connection.connect();



var seanData = {
    id: null,
    name: 'Sean',
    qrlcode: 9382792
};

var westonData = {
    id: null,
    name: 'Weston',
    qrlcode: 3729938
}

var selectQuery = function() {connection.query('select * from inventory', function (err,result) {
    if(err){
        console.error(err);
        return;
    }
    console.log(result);
});}


var seanQuery = function() {connection.query('insert into inventory set ?', seanData, function(err, result) {
  if(err){
      console.error(err);
      return;
  }
  console.error(result);
});}

var westonQuery = function() {connection.query('insert into inventory set ?', westonData, function(err, result) {
    if(err){
        console.error(err);
        return;
    }
    console.error(result);
});}

var deleteQuery = function() {
    connection.query('delete from inventory where name = "Sean"', function (err,result) {
        console.log(result);
    });
    connection.query('delete from inventory where name = "Weston"', function (err,result) {
        console.log(result);
    });
}

function onRequest(request,response){
    if( request.method == 'GET' && request.url == '/'){
        response.writeHead(200,{"Content-Type": "text/html"});
        fs.createReadStream("./index.html").pipe(response);
        console.log("Connected to Home");
    }else{

    if(request.method == 'GET' && request.url == '/insertWeston'){
        westonRequest(request,response);
    }else{

    if(request.method == 'GET' && request.url == '/insertSean'){
        seanRequest(request,response);
    }else {
    if (request.method == 'GET' && request.url == '/deleteEntries') {
        deleteRequest(request, response);
    }else {
        send404Response(response);
    }
    }
    }
    }

}
function westonRequest(request,response){
    response.writeHead(200,{"Content-Type": "text/html"});
    fs.createReadStream("./insertWeston.html").pipe(response);
    console.log("Connected to westonRequest");
    westonQuery();
    selectQuery();
}

function seanRequest(request,response){
    response.writeHead(200,{"Content-Type": "text/html"});
    fs.createReadStream("./insertSean.html").pipe(response);
    console.log("Connected to seanRequest");
    seanQuery();
    selectQuery();
}

function deleteRequest(request,response){
    response.writeHead(200,{"Content-Type": "text/html"});
    fs.createReadStream("./deleteEntries.html").pipe(response);
    console.log("Connected to deleteRequest");
    deleteQuery();
    selectQuery();
}

//error response
function send404Response(response){
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("Error 404: Page not found!");
    response.end();
}


http.createServer(onRequest).listen(8000);
console.log("Server is now running....");