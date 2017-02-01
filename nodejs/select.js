var mysql = require ('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ecs193@@',
    database: 'inventorytracking'
});
connection.connect();

connection.query('select * from inventory', function (err,result){
  console.log(result);
});
