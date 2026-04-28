const express = require("express");
const router = express.Router();
const { addSolde } = require("./wallet.controller");

router.post("/", addSolde);

module.exports = router;