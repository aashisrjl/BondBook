const express = require("express");
const { isAuthenticated } = require("../../middleware/isAuthenticated");
const { createRemainder, getRemainders,updateRemainder, deleteRemainder, getPartnerRemainder } = require("../../controllers/remainder/remainder.controller");
const { errorHandler } = require("../../utils/catchError/catchAsyncError");
const router = express.Router();

router.route("/createRemainder").post(isAuthenticated,createRemainder);
router.route("/getRemainders").get(isAuthenticated,getRemainders);
router.route("/deleteRemainder/:id").delete(isAuthenticated,deleteRemainder);
router.route("/updateRemainder/:id").patch(isAuthenticated,updateRemainder);
router.route("/getPartnerRemainder").get(isAuthenticated,errorHandler(getPartnerRemainder))


module.exports = router;                                                                      