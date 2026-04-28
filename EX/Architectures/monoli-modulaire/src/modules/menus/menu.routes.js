const express = require("express");
const router = express.Router();
const { getMenus } = require("./menu.controller");

router.get("/", getMenus);

module.exports = router;