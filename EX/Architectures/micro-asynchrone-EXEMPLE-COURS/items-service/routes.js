const express = require("express");
const db = require("./database");

const router = express.Router();

router.get("/items", (req, res) => {
  const items = db.prepare('SELECT * FROM items').all();
  res.json(items);
});

module.exports = router;
