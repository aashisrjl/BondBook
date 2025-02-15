const express = require("express");
const { isAuthenticated } = require("../../middleware/isAuthenticated");
const { createRemainder, getRemainders, deleteRemainder } = require("../../controllers/remainder/remainder.controller");
const router = express.Router();

router.route("/createRemainder").post(isAuthenticated,createRemainder);
router.route("/getRemainders").get(isAuthenticated,getRemainders);
router.route("/deleteRemainder/:id").delete(isAuthenticated,deleteRemainder);

module.exports = router;