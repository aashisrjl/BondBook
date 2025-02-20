const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../../middleware/isAuthenticated");
const { postTimeline, getTimeline, getPartnerTimeline, deleteTimeline, updateTimeline } = require("../../controllers/timeline/timeline.controller");
const { upload } = require("../../middleware/multerConfig");

router.route("/createTimeline").post(isAuthenticated,upload.array("photo"),postTimeline);
router.route("/getTimeline").get(isAuthenticated,getTimeline);
router.route("/updateTimeline/:id").patch(isAuthenticated,updateTimeline);
router.route("/deleteTimeline/:id").delete(isAuthenticated,deleteTimeline);
router.route("/getPartnerTimeline").get(isAuthenticated,getPartnerTimeline);

module.exports = router;