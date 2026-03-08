const express = require("express");
const router = express.Router();
const users = require("../services/postUsers");

router.get("/test", (req, res) => {
  res.send("TEST OK");
});

router.post("/create", async function (req, res, next) {
  try {
    res.json(await users.create(req.body));
  } catch (err) {
    console.error(`Erreur lors de la création du compte`, err.message);
    next(err);
  }
});

router.get("/create", (req, res) => {
  res.send("Route create fonctionne");
});

module.exports = router;