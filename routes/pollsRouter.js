const express = require("express");
const router = express.Router();
const Controller = require("../controllers/polls");
const helper = require("../helpers");

// (GET) Get all polls
router.get("/", Controller.getAllPolls);

// (POST) Create new poll
router.post("/", helper.isAuthenticated, Controller.createNewPoll);

// (GET) Get Poll By Poll Id
router.get("/:id", helper.isAuthenticated, Controller.getPollByPollId);

// (GET) Get Polls By User Modarator _Id
router.get("/user/:_id", helper.isAuthenticated, Controller.getPollsByUserId);

// (DELETE) Delete poll by id
router.delete("/:id", helper.isAuthenticated, Controller.deleteOnePollById);

// (PUT) Update poll by id
router.put("/:id", helper.isAuthenticated, Controller.updatePollbyId);

// (PUT) Vote poll
router.put("/vote/:_id", helper.isAuthenticated, Controller.vote);

module.exports = router;
