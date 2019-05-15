const router = require("express").Router();
const Controller = require("../controllers/options");
const Helpers = require("../helpers/index");

router.post("/", Helpers.isAuthenticated, Controller.createNewOption);
router.get("/", Controller.getAllOption);

module.exports = router;
