const express = require("express");
const router = express.Router();
const Controller = require("../controllers/polls");
const helper = require("../helpers");

// router.get("/", Controller.getAllPolls);
router.post("/", helper.isAuthenticated, Controller.createNewPoll);
module.exports = router;
