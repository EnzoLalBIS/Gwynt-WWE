const db = require("./db");

async function update(id, user) {

  const result = await db.query(
    `UPDATE users SET user_Name = ?, password = ? WHERE id = ?`,
    [ user.user_Name , user.password , id ]
  );

  let message = "Erreur modification utilisateur";

  if (result.affectedRows) {
    message = "Utilisateur modifié";
  }

  return { message };
}

module.exports = {
  update
};