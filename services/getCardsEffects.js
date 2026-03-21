const db = require("./db");
const helper = require("../helper");

async function getByCard(cardId) {
  const rows = await db.query(
    `SELECT e.id, e.description, e.dmg, e.state, e.target, e.effect_trigger
     FROM effect e
     INNER JOIN cards_effect ce ON e.id = ce.id_e
     WHERE ce.id_card = ?`,
    [cardId],
  );
  return { data: helper.emptyOrRows(rows) };
}

module.exports = { getByCard };
