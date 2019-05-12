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
      resultUser: resultUser
    });
  },

  getAllPolls: async (req, res) => {
    try {
      const response = await Polls.find();
      res.send({
        message: "Get Success",
        data: response
      });
    } catch (err) {
      res.send({
        message: "Get Error",
        error: err
      });
    }
  }
};
