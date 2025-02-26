const express = require('express');
const { isAuthenticated } = require('../../middleware/isAuthenticated');
const { createPost, getPhotos, getVideos, deleteGalleryItem, getPartnerPhoto, getPartnerVideo } = require('../../controllers/photo/photo.controller');
const { upload } = require('../../middleware/multerConfig');
const { errorHandler } = require('../../utils/catchError/catchAsyncError');
const router = express.Router()

router.route("/createGallery").post(isAuthenticated,upload.array("Url"),errorHandler(createPost))
router.route("/getphoto").get(isAuthenticated,errorHandler(getPhotos))
router.route("/getvideo").get(isAuthenticated,errorHandler(getVideos))
router.route("/deletegallery/:id").delete(isAuthenticated,deleteGalleryItem)
router.route("/getPartnerPhoto").get(isAuthenticated,errorHandler(getPartnerPhoto))
router.route("/getPartnerVideo").get(isAuthenticated,errorHandler(getPartnerVideo))


module.exports = router