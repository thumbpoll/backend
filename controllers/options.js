const Option = require("../models/options");
const Poll = require("../models/polls");

module.exports = {
  // CREATE NEW OPTION
  createNewOption: async (req, res) => {
    try {
      const newOption = {
        description: req.body.description,
        pollId: req.body.pollId
      };
      const resultOption = await Option.create(newOption);

      const resultPoll = await Poll.findOneAndUpdate(
        { _id: req.body.pollId },
        { $push: { options: resultOption._id } },
        { new: true }
      );

      res.status(200).send({
        message: `Create option success`,
        newOption: newOption,
        resultOption: resultOption
      });
    } catch (error) {
      res.status(500).send({
        message: `Create option error`
      });
    }
  },
  // GET ALL OPTION
  getAllOption: async (req, res) => {
    try {
      const getOption = await Option.find();
      res.status(200).send({
        message: `Get option success`,
        data: getOption
      });
    } catch (error) {
      res.status(500).send({
        message: `Get option error`
      });
    }
  }
};
