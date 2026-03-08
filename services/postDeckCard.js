const db = require("./db");

async function addCardToDeck(data) {

  const result = await db.query(
    `INSERT INTO decks_cards (id_Deck, id_Card, Qtt) VALUES (?, ?, ?)`,
    [ data.id_Deck , data.id_Card , data.Qtt ]
  );

  let message = "Erreur ajout carte au deck";

  if (result.affectedRows) {
    message = "Carte ajoutée au deck";
  }

  return { message };
}

module.exports = {
  addCardToDeck
};