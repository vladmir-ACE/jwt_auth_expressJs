const db = require('../db/db_connection.js');

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = `CREATE TABLE users (
        id int NOT NULL AUTO_INCREMENT,
        nom VARCHAR(255), 
        prenom VARCHAR(255),
        age int,
        email VARCHAR(255), 
        tel VARCHAR(255), 
        sexe VARCHAR(100), 
        password VARCHAR(255), 
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_DATE(),
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_DATE(),
        PRIMARY KEY (id)
           )`;
    db.query(sql, function (err, result) {
      if (err) throw err;
      console.log("User Table created");
    });
  });