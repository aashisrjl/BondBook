const mongoose = require("mongoose");
const validator = require("validator");
const surpiseSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required:false
    },
    photo: {
      type: String,
      required:false
    },
    isOpened: {
      type: Boolean,
    },
    scheduleFor: {
      type: Date,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      Ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Surprise = mongoose.model("Surprise", surpiseSchema);
module.exports = Surprise;
