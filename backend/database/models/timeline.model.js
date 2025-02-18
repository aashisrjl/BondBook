const mongoose = require("mongoose");
const validator = require("validator");
const timelineSchema = new mongoose.Schema(
  {
    eventDate: {
      type: Date,
      required: true
    },
    photo: [{
      type: String,

    }],
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
const Timeline = mongoose.model("Timeline", timelineSchema);
module.exports = Timeline;
