const express = require('express');
const addressRouter = express.Router();
const {saveAddress, getPartnerAddress} = require("../../controllers/address/address.controller");
const { upload } = require('../../middleware/multerConfig')

const {isAuthenticated} = require("../../middleware/isAuthenticated");
const { errorHandler } = require('../../utils/catchError/catchAsyncError');

addressRouter.route("/saveAddress").post(isAuthenticated,upload.single('photoUrl'),errorHandler(saveAddress))

addressRouter.route("/getPartnerAddress").get(isAuthenticated,errorHandler(getPartnerAddress))
module.exports= addressRouter;