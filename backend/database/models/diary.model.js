const mongoose = require("mongoose");

const diarySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      validate:{
        validator: function(v)
        {
           const wordCount= v.split(" ").length;
           return wordCount >=3 && wordCount <= 20;
        },
        message:"Title must be between 3 and 20 words"
      }
    },
    content: {
      type: String,
      required: true,
      validate:{
        validator: function(v)
        {
          const wordCount = v.split(" ").length;
          return wordCount>=20 && wordCount <=500;
        },
        message:"Content must be between 20 and 500 words."
      }
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
