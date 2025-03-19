const express = require('express')
const router = express.Router();
const { sendSurprise, fetchAllSurprise,deleteSurprise, updateSurprise, getPartnerSurprise } = require("../../controllers/surprise/surprise.controller");
const {isAuthenticated} = require("../../controllers/auth/auth.controller")

const { errorHandler } = require('../../utils/catchError/catchAsyncError');

router.route("/sendSurprise").post(isAuthenticated,errorHandler(sendSurprise));
router.route("/fetchAllSurprise").get(isAuthenticated,errorHandler(fetchAllSurprise));
router.route("/deleteSurprise/:id").delete(isAuthenticated,errorHandler(deleteSurprise));
router.route("/updateSurprise/:surpriseId").patch(isAuthenticated,errorHandler(updateSurprise));
router.route("/getPartnerSurprise").get(isAuthenticated,errorHandler(getPartnerSurprise))

module.exports = router
