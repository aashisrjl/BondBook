const express = require('express');
const { isAuthenticated } = require('../../middleware/isAuthenticated');
const { errorHandler } = require('../../utils/catchError/catchAsyncError');
const { addPartner, verifyPartnerToken, getLoggedInUserData, getPartnerData, removePartner, changePassword, forgotPassword, verifyForgotPassword, changeForgotPassword, editProfilePic, updateProfile, updateSocialMediaLinks, updateMood, updateStat } = require('../../controllers/users/user.controller');
const { upload } = require('../../middleware/multerConfig');
const router = express.Router()

//profile
router.route("/user/profile").get(isAuthenticated,errorHandler(getLoggedInUserData));
router.route("/user/partnerProfile").get(isAuthenticated,errorHandler(getPartnerData));

//partner
router.route("/user/addPartner").post(isAuthenticated,errorHandler(addPartner));
router.route("/user/verifyPartnerToken").post(isAuthenticated,errorHandler(verifyPartnerToken))
router.route("/user/deletePartner").delete(isAuthenticated,errorHandler(removePartner))

//password
router.route("/user/changePassword").post(isAuthenticated,errorHandler(changePassword));
router.route("/user/forgotPassword").post(errorHandler(forgotPassword));
router.route("/user/verifyForgotPassword").post(errorHandler(verifyForgotPassword));
router.route("/user/changeForgotPassword").post(errorHandler(changeForgotPassword));


router.route("/user/editProfilePic").patch(isAuthenticated,upload.single("photoUrl"),errorHandler(editProfilePic))
router.route("/user/updateProfile").patch(isAuthenticated,errorHandler(updateProfile))
router.route("/user/updateSocialMediaLinks").patch(isAuthenticated,errorHandler(updateSocialMediaLinks))
router.route("/user/updateMood").patch(isAuthenticated,errorHandler(updateMood))
router.route("/user/updateStat").patch(isAuthenticated,errorHandler(updateStat))
module.exports = router