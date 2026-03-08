const db = require("./db");

async function update(id, user) {

  const result = await db.query(
    `UPDATE users SET Deck = ?`,
    [ user.Deck , id ]
  );

  let message = "Erreur modification Deck";

  if (result.affectedRows) {
    message = "Utilisateur modifié";
  }

  return { message };
}

module.exports = {
  update
};