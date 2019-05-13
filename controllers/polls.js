const Poll = require("../models/polls");
const User = require("../models/users");
const helpers = require("../helpers");

module.exports = {
  // CREATE NEW POLL
  createNewPoll: async (req, res) => {
    const decodedToken = await helpers.verifyToken(req.token);

    const newPoll = {
      moderator: decodedToken._id,
      title: req.body.title
    };

    const resultPoll = await Poll.create(newPoll);

    const resultUser = await User.findOneAndUpdate(
      { _id: decodedToken._id },
      { $push: { polls: resultPoll._id } },
      { new: true }
    );
    res.send({
      message: "New poll is created",
      newPoll: newPoll,
      resultPoll: resultPoll,
      resultUser: {
        _id: resultUser._id,
        id: resultUser.id,
        fullName: resultUser.fullName,
        email: resultUser.email
      }
    });
  },
  // GET ALL POLL
  getAllPolls: async (req, res) => {
    res.send({
      message: "Get all polls",
      polls: await Poll.find({}).populate("moderator", "-password -polls")
    });
  },
  // GET POLL BY POLL ID
  getPollByPollId: async (req, res) => {
    const pollFound = await Poll.findOne({
      id: Number(req.params.id)
    }).populate("moderator", "-password -polls");

    if (pollFound) {
      res.send({
        message: "Get poll by poll id",
        polls: pollFound
      });
    } else {
      res.send({
        message: "Poll id not found"
      });
    }
  },
  // GET POLLS BY USER ID
  getPollsByUserId: async (req, res) => {
    const userFound = await User.findOne({
      id: Number(req.params.id)
    }).populate("polls", "-moderator");

    if (userFound) {
      res.send({
        message: "Get poll by user id",
        ...userFound._doc,
        password: "HIDDEN"
      });
    } else {
      res.send({
        message: "User id not found"
      });
    }
  },
  // DELETE ONE POLL BY ID
  deleteOnePollById: async (req, res) => {
    const pollFound = await Poll.findOne({ id: Number(req.params.id) });

    if (pollFound) {
      const poll = await Poll.findOneAndRemove({ id: Number(req.params.id) });

      res.send({
        message: "Delete one poll by id",
        user: poll
      });
    } else {
      res.send({
        message: "Id poll is not found"
      });
    }
  }
};
