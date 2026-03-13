const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function create(user) {
  const result = await db.query(
    `INSERT INTO users (user_Name, Password) VALUES (?, ?)`,
    [user.user_Name, user.Password]
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