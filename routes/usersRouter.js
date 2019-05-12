const express = require("express");
const router = express.Router();
const Controller = require("../controllers/users");
const helper = require("../helpers");

// (POST) Register new user
router.post("/register", helper.isUserExist, Controller.register);

// (POST) Login registered user
router.post("/login", Controller.login);

// (GET) Logout user
router.get("/logout", Controller.logout);

// (GET) Get user profile;
router.get("/profile", helper.isAuthenticated, Controller.getProfile);

// (GET) Get one user by id;
router.get("/:id", Controller.getOneUserById);

// (GET) Get all users;
router.get("/", Controller.getAllUsers);

// (DELETE) Delete user by id;
router.delete("/:id", helper.isAuthenticated, Controller.deleteOneUserById);

// (PUT) Update user by id;
router.put("/:id", helper.isAuthenticated, Controller.updateOneUserById);

module.exports = router;
