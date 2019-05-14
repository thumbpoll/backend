const express = require("express");
const router = express.Router();
const Controller = require("../controllers/polls");
const helper = require("../helpers");

// (GET) Get all polls
router.get("/", Controller.getAllPolls);

// (POST) Create new poll
router.post("/", helper.isAuthenticated, Controller.createNewPoll);

// (GET) Get Poll By Poll Id
router.get("/:id", Controller.getPollByPollId);

// (GET) Get Polls By User Modarator _Id
router.get("/user/:_id", Controller.getPollsByUserId);

// (DELETE) Delete poll by id
router.delete("/:id", helper.isAuthenticated, Controller.deleteOnePollById);

//(PUT) update poll by id
router.put("/:id", Controller.updatePollbyId);

module.exports = router;
