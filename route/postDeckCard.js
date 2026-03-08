const express = require("express");
const router = express.Router();
const deckCards = require("../services/postDeckCard");

router.post("/addCard", async function (req, res, next) {

  try {

    const result = await deckCards.addCardToDeck( req.body );

    res.json(result);

  } catch (err) {

    console.error("Erreur ajout carte deck", err.message);
    next(err);

  }

});

module.exports = router;