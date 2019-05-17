const Poll = require("../models/polls");
const User = require("../models/users");
const Option = require("../models/options");
const helpers = require("../helpers");

module.exports = {
  // CREATE NEW POLL
  createNewPoll: async (req, res) => {
    try {
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
    } catch (error) {
      res.status(500).send({
        message: `Create new poll error`
      });
    }
  },
  // GET ALL POLL
  getAllPolls: async (req, res) => {
    try {
      res.send({
        message: "Get all polls",
        polls: await Poll.find({})
          .populate("moderator options", "-password -polls")
          .sort([["updatedAt", "descending"]])
      });
    } catch (error) {
      res.status(500).send({
        message: `Get all polls error`
      });
    }
  },
  // GET POLL BY POLL ID
  getPollByPollId: async (req, res) => {
    try {
      const pollFound = await Poll.findOne({
        id: Number(req.params.id)
      }).populate(
        "moderator options",
        "-password -polls -createdAt -updatedAt"
      );

      if (pollFound) {
        res.send({
          message: "Get poll by poll id",
          polls: pollFound
        });
      } else {
        res.status(500).send({
          message: "Poll id not found"
        });
      }
    } catch (error) {
      res.status(500).send({
        message: `Get Poll By Id error`
      });
    }
  },
  // GET POLLS BY MODERATOR _ID
  getPollsByUserId: async (req, res) => {
    try {
      moderator_Id = req.params._id;

      const pollFound = await Poll.find({
        moderator: moderator_Id
      }).populate(
        "moderator options",
        "-password -polls -createdAt -updatedAt"
      );

      if (pollFound) {
        res.send({
          message: "Get poll by poll id",
          polls: pollFound
        });
      } else {
        res.status(500).send({
          message: "Poll id not found"
        });
      }
    } catch (error) {
      res.status(500).send({
        message: `Get Polls by Moderator error`
      });
    }
  },
  // DELETE ONE POLL BY Id
  deleteOnePollById: async (req, res) => {
    try {
      const pollFound = await Poll.findOne({ id: Number(req.params.id) });

      if (pollFound) {
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
        res.status(500).send({
          message: "Id poll is not found"
        });
      }
    } catch (error) {
      res.status(500).send({
        message: `Delete poll by id error`
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
        message: `Update Poll Success`,
        data: pollFound
      });
    } catch (error) {
      res.status(500).send({
        message: `Update Polls Error`
      });
    }
  },
  vote: async (req, res) => {
    try {
      const decodedToken = req.decoded;

      const pollId = req.params._id;
      const optionId = req.body.optionId;

      const foundOption = await Option.findOne({
        $and: [{ pollId: pollId }, { _id: optionId }]
      });

      if (foundOption.voters.includes(decodedToken._id)) {
        return res.send({
          message: "You have voted"
        });
      } else {
        const resultVote = await Option.findOneAndUpdate(
          { $and: [{ pollId: pollId }, { _id: optionId }] },
          { $push: { voters: decodedToken._id } },
          { new: true }
        );
        res.status(200).send({
          message: "Vote Success",
          data: {
            user: decodedToken,
            data: resultVote
          }
        });
      }
    } catch (error) {
      res.status(500).send({
        message: "Vote Error. Option Not Found"
      });
    }
  },
  countVoters: async (req, res) => {
    try {
      let totalVotes = 0;
      const foundOption = await Option.find({ pollId: req.params._id });
      const countVoters = foundOption.map(item => {
        totalVotes += item.voters.length;
        return (num = {
          desc: item.description,
          votes: item.voters.length
        });
      });

      res.status(200).send({
        message: "Count Voters Success",
        pollId: req.params._id,
        result: countVoters,
        totalVotes: totalVotes
      });
    } catch (error) {
      res.status(500).send({
        message: "Count Error",
        error: error
      });
    }
  }
};
