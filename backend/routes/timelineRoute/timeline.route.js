const express = require("express");
const { isAuthenticated } = require("../../middleware/isAuthenticated");
const { postTimeline, getTimeline, getPartnerTimeline } = require("../../controllers/timeline/timeline.controller");
const router = express.Router();

router.route("/createTimeline").post(isAuthenticated,postTimeline)
router.route("/getTimeline").get(isAuthenticated,getTimeline)
router.route("/updateTimeline/:id").patch()
router.route("/deleteTimeline/:id").delete()
router.route("/getPartnerTimeline").get(isAuthenticated,getPartnerTimeline)

module.exports = router;