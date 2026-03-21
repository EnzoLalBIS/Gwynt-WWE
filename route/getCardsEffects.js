const express = require("express");
const router = express.Router();
const getCardsEffects = require("../services/getCardsEffects");

router.get("/:cardId", async function (req, res, next) {
  try {
    const cardId = req.params.cardId;
    console.log("Fetching effects for card:", cardId);
    res.json(await getCardsEffects.getByCard(cardId));
  } catch (err) {
    console.error(`Error while getting card effects`, err.message);
    next(err);
  }
});

module.exports = router;
