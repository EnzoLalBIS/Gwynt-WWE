const db = require("./db");
const helper = require("../helper");

async function getByDeck(deckId) {
  const rows = await db.query(
    `SELECT c.id, c.name, c.type, c.dmg, c.role, c.effect,
            c.animation, c.img, c.description, c.music,
            dc.Qtt
     FROM cards c
     INNER JOIN Decks_cards dc ON c.id = dc.id_Card
     WHERE dc.id_Deck = ?`,
    [deckId],
  );
  return { data: helper.emptyOrRows(rows) };
}

module.exports = { getByDeck };
