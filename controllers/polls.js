const Poll = require("../models/polls");
const User = require("../models/users");
const Option = require("../models/options");
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
      }``
    });
  },
  // GET ALL POLL
  getAllPolls: async (req, res) => {
    res.send({
      message: "Get all polls",
      polls: await Poll.find({}).populate(
        "moderator options",
        "-password -polls"
      )
    });
  },
  // GET POLL BY POLL ID
  getPollByPollId: async (req, res) => {
    const pollFound = await Poll.findOne({
      id: Number(req.params.id)
    }).populate("moderator options", "-password -polls -createdAt -updatedAt");

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
  // GET POLLS BY MODERATOR _ID
  getPollsByUserId: async (req, res) => {
    moderator_Id = req.params._id;

    const pollFound = await Poll.find({
      moderator: moderator_Id
    }).populate("moderator options", "-password -polls -createdAt -updatedAt");

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
  // DELETE ONE POLL BY Id
  deleteOnePollById: async (req, res) => {
    const pollFound = await Poll.findOne({ id: Number(req.params.id) });

    if (pollFound) {
      // console.log(pollFound);
      const resultPoll = await Poll.findOneAndRemove({
        id: Number(req.params.id)
      });

      const resultArrayPoll = await User.findOneAndUpdate(
        { _id: pollFound.moderator },
        { $pull: { polls: pollFound._id } }
      );

      const deleteOnePollOption = await Option.remove({
        pollId: pollFound._id
      });

      res.send({
        message: "Delete one poll by id",
        poll: resultPoll
      });
    } else {
      res.send({
        message: "Id poll is not found"
      });
    }
  },
  updatePollbyId: async (req, res) => {
    try {
      const pollFound = await Poll.findOneAndUpdate(
        { id: req.params.id },
        {
          $set: {
            title: req.body.title,
            timeLimit: req.body.timeLimit
          }
        }
      );

      res.status(200).send({
        message: `Update Poll success`,
        data: pollFound
      });
    } catch (error) {
      res.status(500).send({
        message: `Update Polls Error`
      });
    }
  }
};
