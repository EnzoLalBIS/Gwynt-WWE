const express = require("express");
const router = express.Router();
const getUsers = require("../services/getDeckCards");

router.get("/{:type}", async function (req, res, next) {
  try {
    console.log(req.query.type);
    
    res.json(await getCards.getMultiple(req.query.page, req.query.type));
  } catch (err) {
    console.error(`Error while getting the users`, err.message);
    next(err);
  }
});

module.exports = router;
