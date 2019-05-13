const express = require("express");
const router = express.Router();
const Controller = require("../controllers/polls");
const helper = require("../helpers");

router.get("/", Controller.getAllPolls);
router.post("/", helper.isAuthenticated, Controller.createNewPoll);
router.get("/:id", Controller.getPollByPollId);
router.get("/user/:id", Controller.getPollsByUserId);
router.delete("/:id", helper.isAuthenticated, Controller.deleteOnePollById);
module.exports = router;
