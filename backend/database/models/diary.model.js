const mongoose = require("mongoose");

const diarySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: [5, "Title must be at least 5 characters long"],
      maxlength: [20, "Title cannot exceed 20 characters"],
    },
    content: {
      type: String,
      required: true,
      maxlength: [500, "Content cannot exceed 500 characters"],

    },

    DiaryType: {
      enum: ["Shared", "Personal"],
      type: String,
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Diary = mongoose.model("Diary", diarySchema);

module.exports = Diary;
