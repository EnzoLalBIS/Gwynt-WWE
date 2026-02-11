let mysql = require("mysql");
let config = require("../config");

let con = mysql.createConnection(config.db);

con.connect(function (err) {
    
    let C_Decks = "CREATE TABLE IF NOT EXISTS Decks (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(40), Qtt INT, img VARCHAR(150));" ;
    let C_Decks_cards = "CREATE TABLE IF NOT EXISTS Decks_cards (id INT AUTO_INCREMENT PRIMARY KEY, id_Deck INT, id_Card INT, Qtt INT);";
    let C_cards = "CREATE TABLE IF NOT EXISTS cards (id INT AUTO_INCREMENT PRIMARY KEY, nom VARCHAR(20), type VARCHAR(20), dgt INT, role VARCHAR(20), effet TINYINT(1) NOT NULL DEFAULT 0, animation VARCHAR(40), img VARCHAR(40), description VARCHAR(80), music VARCHAR(40));";
    let C_cards_effect = "CREATE TABLE IF NOT EXISTS cards_effect (id INT AUTO_INCREMENT PRIMARY KEY, id_card INT, id_e INT);";
    let C_effect = "CREATE TABLE IF NOT EXISTS effect (id INT AUTO_INCREMENT PRIMARY KEY, description VARCHAR(80), dgt INT, state VARCHAR(80), Target VARCHAR(10), death TINYINT(1) NOT NULL DEFAULT 0, steal TINYINT(1) NOT NULL DEFAULT 0, can_generate TINYINT(1) NOT NULL DEFAULT 0, create_id INT, card_effect INT);";
    let C_Users = "CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, User_Name VARCHAR(20), PP VARCHAR(40), Password VARCHAR(20), mail VARCHAR(30), Deck INT, entree VARCHAR(20));";
  if (err) throw err;
  console.log("Connected !");
  con.query(C_Decks, function (err) {
    if (err) throw err;
    console.log("table created");
  });
  con.query(C_Decks_cards, function (err) {
    if (err) throw err;
    console.log("table created");
  });
  con.query(C_cards, function (err) {
    if (err) throw err;
    console.log("table created");
  });
  con.query(C_cards_effect, function (err) {
    if (err) throw err;
    console.log("table created");
  });
  con.query(C_effect, function (err) {
    if (err) throw err;
    console.log("table created");
  });
  con.query(C_Users, function (err) {
    if (err) throw err;
    console.log("table created");
  });
});
