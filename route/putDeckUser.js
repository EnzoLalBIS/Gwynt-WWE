const express = require("express");
const router = express.Router();
const users = require("../services/putDeckUser");

router.put("/:id", async function (req, res, next) {
  try {

    const result = await users.update(req.params.id, req.body);

    res.json(result);

  } catch (err) {
    console.error("Erreur modification Deck", err.message);
    next(err);
  }
});

module.exports = router;