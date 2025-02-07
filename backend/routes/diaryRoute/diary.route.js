const express = require("express");
const diaryRouter = express.Router();
const {
  createDiary,
  updateDiary,
  fetchAllDiary,
  deleteDiary,
} = require("../../controllers/diary/diary.controller");
const { isAuthenticated } = require("../../middleware/isAuthenticated");

diaryRouter.post("/createDiary", isAuthenticated, createDiary);
diaryRouter.patch("/updateDiary/:_id", isAuthenticated, updateDiary);
diaryRouter.post("/deleteDiary/:_id", isAuthenticated, deleteDiary);
diaryRouter.get("/fetchAllDiary", isAuthenticated, fetchAllDiary);

module.exports = diaryRouter;
