const express = require("express");
const router = express.Router();
const getDeckCards = require("../services/getDeckCards"); // Name update

router.get("/:deckId", async function (req, res, next) {
  try {
    const deckId = req.params.deckId;
    console.log("Fetching cards for deck:", deckId);
    res.json(await getDeckCards.getByDeck(deckId));
  } catch (err) {
    console.error(`Error while getting deck cards`, err.message);
    next(err);
  }
});

module.exports = router;
