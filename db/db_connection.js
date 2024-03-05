var mysql = require('mysql');

let db = mysql.createConnection({
host: "localhost", 
user: "root",    
password: "",    
database: "node-jwt" 
});


module.exports = db;