const express = require("express");
const router = express.Router();
const { order } = require("./user.controller");

router.post("/", order);

module.exports = router;