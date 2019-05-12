const Users = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  encryptPassword: async plainPassword => {
    const salt = await bcrypt.genSalt(7);
    const encryptedPassword = await bcrypt.hash(plainPassword, salt);
    return {
      salt,
      encryptedPassword
    };
  },

  comparePassword: async (password, encryptedPassword) => {
    const isAuthenticated = await bcrypt.compare(password, encryptedPassword);
    return isAuthenticated;
  },

  createToken: async foundUser => {
    const payload = {
      _id: foundUser._id,
      fullName: foundUser.fullName,
      email: foundUser.email
    };
    const token = await jwt.sign(payload, process.env.JWT_SECRET);
    return token;
  },
  verifyToken: async token => {
    try {
      const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
      return decodedToken;
    } catch (error) {
      return error;
    }
  },

  isAuthenticated: async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      req.token = token;
      req.decoded = decoded;
      next();
    } catch (error) {
      res.send({
        message: "Token is not exist in headers of Authorization"
      });
    }
  },

  isUserExist: async (req, res, next) => {
    const user = await Users.findOne({ email: req.body.email });
    if (!user) {
      next();
    } else {
      res.send({
        message: "User is already exist with that email!"
      });
    }
  },

  hasAPIKey: async (req, res, next) => {
    req.key = req.headers["x-api-key"];
    if (req.key) {
      next();
    } else {
      res.send({
        message: "You do not have the key!"
      });
    }
  }
};
