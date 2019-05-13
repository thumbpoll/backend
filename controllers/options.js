const Option = require("../models/options");

module.exports = {
  // CREATE NEW
  createNewOption: async (req, res) => {
    const newOption = {
      description: req.body.description
    };

    console.log(newOption);

    const resultOption = await Option.create(newOption);

    console.log(resultOption);

    res.send({
      message: "Create option success"
    });
  }
};
