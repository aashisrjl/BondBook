const express = require("express");
const diaryRouter = express.Router();
const {
  createDiary,
  updateDiary,
  fetchAllDiary,
  deleteDiary,
  getPartnerDiary,
} = require("../../controllers/diary/diary.controller");
const { isAuthenticated } = require("../../middleware/isAuthenticated");
const { errorHandler } = require("../../utils/catchError/catchAsyncError");

diaryRouter.post("/createDiary", isAuthenticated, createDiary);
diaryRouter.patch("/updateDiary/:_id", isAuthenticated, updateDiary);
diaryRouter.delete("/deleteDiary/:_id", isAuthenticated, deleteDiary);
diaryRouter.get("/fetchAllDiary", isAuthenticated, fetchAllDiary);
diaryRouter.get("/getPartnerDiary",isAuthenticated, getPartnerDiary);

module.exports = diaryRouter;
