const express = require("express");
const router = express.Router();
const users = require("../services/postUsers");

router.post("/create", async function (req, res, next) {
  try {
    res.json(await users.create(req.body));
  } catch (err) {
    console.error(`Error creating account`, err.message);
    next(err);
  }
});

router.post("/login", async function (req, res, next) {
  try {
    res.json(await users.login(req.body));
  } catch (err) {
    console.error(`Error during login`, err.message);
    next(err);
  }
});

module.exports = router;
