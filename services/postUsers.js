const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function create(user) {
  const result = await db.query(
    `INSERT INTO users (User_Name, Password) VALUES (?, ?)`,
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