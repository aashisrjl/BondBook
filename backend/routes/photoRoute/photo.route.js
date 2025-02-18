const express = require('express');
const { isAuthenticated } = require('../../middleware/isAuthenticated');
const { createPost, getPhotos, getVideos, deleteGalleryItem } = require('../../controllers/photo/photo.controller');
const { upload } = require('../../middleware/multerConfig');
const router = express.Router()

router.route("/createGallery").post(isAuthenticated,upload.array("Url"),createPost)
router.route("/getphoto").get(isAuthenticated,getPhotos)
router.route("/getvideo").get(isAuthenticated,getVideos)
router.route("/deletegallery/:id").delete(isAuthenticated,deleteGalleryItem)


module.exports = router