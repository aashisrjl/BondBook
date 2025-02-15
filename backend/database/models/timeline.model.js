const mongoose = require("mongoose");
const validator = require("validator");
const timelineSchema = new mongoose.Schema(
  {
    eventDate: {
      type: Date,
      required: true
    },
    photo: {
      type: String,
      // validate(value) {
      //   if (!validator.isURL(value)) {
      //     throw new Error("Invalid Photo Url:", value);
      //   }
      // },
    },
    description: {
      type: String,
    },
    title:{
      type: String
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      Ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
const Timeline = mongoose.model("Photo", timelineSchema);
module.exports = Timeline;
