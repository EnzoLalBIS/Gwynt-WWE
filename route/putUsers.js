const express = require("express");
const router = express.Router();
const users = require("../services/putUsers");

router.put("/:id", async function (req, res, next) {
  try {

    const result = await users.update(req.params.id, req.body);

    res.json(result);

  } catch (err) {
    console.error("Erreur modification utilisateur", err.message);
    next(err);
  }
});

module.exports = router;