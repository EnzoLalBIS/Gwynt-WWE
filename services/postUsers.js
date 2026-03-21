const db = require("./db");

async function create(user) {
  const result = await db.query(
    `INSERT INTO users (user_Name, password) VALUES (?, ?)`,
    [user.user_Name, user.password],
  );

  let message = "Error creating account";
  if (result.affectedRows) {
    message = "Account created successfully";
  }

  return { message };
}

async function login(user) {
  const rows = await db.query(
    `SELECT id, user_Name FROM users WHERE user_Name = ? AND password = ? LIMIT 1`,
    [user.user_Name, user.password],
  );

  if (rows.length === 0) {
    return { success: false, message: "Invalid username or password" };
  }

  return {
    success: true,
    user: {
      id: rows[0].id,
      user_Name: rows[0].user_Name,
    },
  };
}

module.exports = { create, login };
