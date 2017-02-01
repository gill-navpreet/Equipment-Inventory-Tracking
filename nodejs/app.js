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

var data = {
    id: null,
    name: 'Sean',
    qrlcode: 9382792
};

var query = connection.query('insert into inventory set ?', data, function(err, result) {
  if(err){
      console.error(err);
      return;
  }
  console.error(result);
});

function send404Response(response){
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("Error 404: Page not found!");
    response.end();
}

function onRequest(request,response){
    if( request.method == 'GET' && request.url == '/'){
        response.writeHead(200,{"Content-Type": "text/html"});
        fs.createReadStream("./index.html").pipe(response);
    }else{
        send404Response(response);
    }
}

http.createServer(onRequest).listen(8000);
console.log("Server is now running....");