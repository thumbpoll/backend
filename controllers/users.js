const User = require("../models/users");
const helpers = require("../helpers");

const usersControllers = {
  // REGISTER NEW USER
  register: async (req, res) => {
    const { salt, encryptedPassword } = await helpers.encryptPassword(
      req.body.password
    );
    const newUser = {
      fullName: req.body.fullName,
      email: req.body.email,
      salt: salt,
      password: encryptedPassword
    };
    const result = await User.create(newUser);
    res.send({
      message: "Register",
      newUser: {
        fullName: newUser.fullName,
        email: newUser.email
      },
      result: {
        ...result._doc,
        salt: "HIDDEN",
        password: "HIDDEN"
      }
    });
  },
  // LOGIN WITH REGISTERED USER
  login: async (req, res) => {
    const user = {
      email: req.body.email,
      password: req.body.password
    };

    const foundUser = await User.findOne({ email: user.email });

    if (foundUser) {
      const authenticated = await helpers.comparePassword(
        user.password,
        foundUser.password
      );
      if (authenticated) {
        const token = await helpers.createToken(foundUser);
        res.send({
          message: "Login with registered user",
          token: token,
          user: {
            fullName: foundUser.fullName,
            email: foundUser.email
          }
        });
      } else {
        res.send({
          message: "Login failed because password doesn't match"
        });
      }
    } else {
      res.send({
        message: "Login failed because user is not found"
      });
    }
  },
  // LOGOUT WITH LOGGED USER
  logout: async (req, res) => {
    res.send({
      message: "Logged out the user"
    });
  },
  // GET PROFILE BY AUTHENTICATED USER
  getProfile: async (req, res) => {
    const token = req.token;
    const decodedUser = req.decoded;

    if (decodedUser.sub) {
      const user = await User.findById(decodedUser.sub, "-password -salt");

      res.send({
        message: "Get my profile",
        tokenIsExist: true,
        decodedUser: decodedUser,
        userIsFound: Boolean(user),
        user: user
      });
    } else {
      res.send({
        message: "Token is invalid"
      });
    }
  },
  // GET ALL USERS
  getAllUsers: async (req, res) => {
    const users = await User.find({}, "-password -salt");

    res.send({
      message: "Get all users",
      users: users
    });
  },

  // GET ONE USER BY ID
  getOneUserById: async (req, res) => {
    const user = await User.findOne({ id: req.params.id }, "-password -salt");

    res.send({
      message: "Get one user by id",
      user: user
    });
  },

  // DELETE ONE USER BY ID
  deleteOneUserById: async (req, res) => {
    const userFound = await User.findOne({ id: Number(req.params.id) });

    if (userFound) {
      const user = await User.findOneAndRemove(
        { id: Number(req.params.id) },
        { select: "-password -salt" }
      );

      res.send({
        message: "Delete one user by id",
        user: user
      });
    } else {
      res.send({
        message: "User is not found"
      });
    }
  },

  // UPDATE ONE USER BY ID
  updateOneUserById: async (req, res) => {
    const userFound = await User.findOne({ id: Number(req.params.id) });

    if (userFound) {
      const { salt, encryptedPassword } = await helpers.encryptPassword(
        req.body.password
      );
      const newUser = {
        fullName: req.body.fullName,
        email: req.body.email,
        salt: salt,
        password: encryptedPassword
      };
      const user = await User.findOneAndUpdate(
        { id: Number(req.params.id) },
        { $set: newUser },
        {
          new: true,
          select: "-password -salt"
        }
      );
      res.send({
        message: "Update one user by id",
        user: user
      });
    } else {
      res.send({
        message: "User is not found"
      });
    }
  }
};

module.exports = usersControllers;
