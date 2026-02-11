let mysql = require("mysql");
let config = require("../config");

let con = mysql.createConnection(config.db);

con.connect(function (err) {
    let C_I_Deck = "INSERT INTO Decks (name) VALUES ('Smackdown')";
  if (err) throw err;
  console.log("Connected !");
  con.query(C_I_Deck, function (err) {
    if (err) throw err;
    console.log("Var add");
  });
});
