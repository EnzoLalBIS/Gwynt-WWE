const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function create(decks) {
  const result = await db.query(
    `INSERT INTO Decks (name) VALUES (?)`,
    [user.User_Name, user.Password]
  );

  let message = "Erreur lors de la création du compte";

  if (result.affectedRows) {
    message = "Compte créé avec succès";
  }

  return { message };
}

module.exports = {
  create,
};