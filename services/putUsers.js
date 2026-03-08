const db = require("./db");

async function update(id, user) {

  const result = await db.query(
    `UPDATE users SET User_Name = ?, Password = ? WHERE id = ?`,
    [ user.User_Name , user.Password , id ]
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