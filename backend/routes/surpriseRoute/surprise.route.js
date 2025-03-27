const express = require('express')
const router = express.Router();
const { errorHandler } = require('../../utils/catchError/catchAsyncError');
const { sendSurprise, getAllSurprises, deleteSurprise, updateSurprise, getPartnerSurprise } = require('../../controllers/surprise/surprise.controller');
const { isAuthenticated } = require('../../middleware/isAuthenticated');
const { upload } = require('../../middleware/multerConfig');

router.route("/sendSurprise").post(isAuthenticated,upload.single('photo'),sendSurprise);
router.route("/fetchAllSurprise").get(isAuthenticated,getAllSurprises);
router.route("/deleteSurprise/:id").delete(isAuthenticated,errorHandler(deleteSurprise));
router.route("/updateSurprise/:surpriseId").patch(isAuthenticated,errorHandler(updateSurprise));
router.route("/getPartnerSurprise").get(isAuthenticated,errorHandler(getPartnerSurprise));

module.exports = router

