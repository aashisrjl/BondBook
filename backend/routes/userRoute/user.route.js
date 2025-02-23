const express = require('express');
const { isAuthenticated } = require('../../middleware/isAuthenticated');
const { errorHandler } = require('../../utils/catchError/catchAsyncError');
const { addPartner, verifyPartnerToken, getLoggedInUserData, getPartnerData, removePartner, changePassword, forgotPassword, verifyForgotPassword, changeForgotPassword } = require('../../controllers/users/user.controller');
const router = express.Router()

router.route("/user/profile").get(isAuthenticated,errorHandler(getLoggedInUserData));
router.route("/user/partnerProfile").get(isAuthenticated,errorHandler(getPartnerData));
router.route("/user/addPartner").post(isAuthenticated,errorHandler(addPartner));
router.route("/user/verifyPartnerToken").post(isAuthenticated,errorHandler(verifyPartnerToken))
router.route("/user/deletePartner").delete(isAuthenticated,errorHandler(removePartner))
router.route("/user/changePassword").post(isAuthenticated,errorHandler(changePassword));
router.route("/user/forgotPassword").post(errorHandler(forgotPassword));
router.route("/user/verifyForgotPassword").post(errorHandler(verifyForgotPassword));
router.route("/user/changeForgotPassword").post(errorHandler(changeForgotPassword));


module.exports = router