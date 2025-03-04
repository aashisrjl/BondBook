const express = require("express");
const { isAuthenticated } = require("../../middleware/isAuthenticated");
const { addMusic, getMusic, deleteMusic, updateMusic } = require("../../controllers/music/music.controller");
const { errorHandler } = require("../../utils/catchError/catchAsyncError");
const router = express.Router();

// Routes for music management
router.post("/musics", isAuthenticated, errorHandler(addMusic)); 
router.get("/musics", isAuthenticated, errorHandler(getMusic));  
router.delete("/musics/:id", isAuthenticated, errorHandler(deleteMusic)); 
router.put("/musics/:id", isAuthenticated, errorHandler(updateMusic));  

module.exports = router;