// const Option = require("../models/option");
// const User = require("../models/users");
// const helpers = require("../helpers");

module.exports = {
  // createNewOption: async (req, res) => {
  //   try {
  //     const option = await Option.create({
  //       description: req.body.description
  //     });
  //     res.status(200).send({
  //       message: `Create option success`,
  //       data: option
  //     });
  //   } catch (error) {
  //     res.status(500).send({
  //       message: `Create option error`
  //     });
  //   }
  // },
  // updateOption: async (req, res) => {
  //   try {
  //     const updateOption = await Option.update(
  //       {
  //         id: req.params.id
  //       },
  //       {
  //         $set: {
  //           description: req.body.description
  //         }
  //       }
  //     );
  //     res.status(200).send({
  //       message: `Update option success`,
  //       data: updateOption
  //     });
  //   } catch (error) {
  //     res.status(500).send({
  //       message: `Update option error`
  //     });
  //   }
  // },
  // deleteOneOption: async (req, res) => {
  //   try {
  //     const deleteOption = await Option.deleteOne({ id: req.params.id });
  //     res.status(200).send({
  //       message: `Delete option success`,
  //       data: deleteOption
  //     });
  //   } catch (error) {
  //     res.status(500).send({
  //       message: `Delete option error`
  //     });
  //   }
  // },
  // getAllOption: async (req, res) => {
  //   try {
  //     const getOption = await Option.find();
  //     res.status(200).send({
  //       message: `Get option error`,
  //       data: getOption
  //     });
  //   } catch (error) {
  //     res.status(500).send({
  //       message: `Get option error`
  //     });
  //   }
  // }
};

// const decodedToken = await helpers.verifyToken(req.token);
// const newOption = {
//   description: req.body.description,
//   image: req.body.image,
//   voters: decodedToken._id
// };
// const resultOption = await Option.create(newOption);
// const resultUser = await User.findOneAndUpdate(
//   { _id: decodedToken._id },
//   { $push: { option: resultOption._id } },
//   { new: true }
// );
// res.send({
//   message: `New option is created`,
//   newOption: newOption,
//   resultOption: resultOption,
//   resultUser: {
//     _id: resultUser._id,
//     id: resultUser.id,
//     fullName: resultUser.fullName,
//     email: resultUser.email
//   }
// });
