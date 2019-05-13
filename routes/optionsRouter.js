const express = require("express");
const router = express.Router();
const Controller = require("../controllers/options");
const helper = require("../helpers");

router.post("/", Controller.createNewOption);

module.exports = router;
