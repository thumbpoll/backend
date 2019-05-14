const router = require("express").Router();
const Controller = require("../controllers/options");
const Helpers = require("../helpers/index");

router.post("/", Controller.createNewOption);
// router.put("/:id", Helpers.isAuthenticated, Controller.updateOption);
// router.delete("/:id", Helpers.isAuthenticated, Controller.deleteOneOption);
// router.get("/", Controller.getAllOption);

module.exports = router;
