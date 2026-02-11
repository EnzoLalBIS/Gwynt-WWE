let mysql = require("mysql");
let config = require("../config");

let con = mysql.createConnection({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Its alive !");
  con.query("CREATE DATABASE IF NOT EXISTS game", function (err) {
    if (err) throw err;
    console.log("Database created");
  });
});
