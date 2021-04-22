var express = require("express");
var router = express.Router();
const { register } = require("../controllers/register");

const users = [];

router.post("/register", register);

module.exports = router;
