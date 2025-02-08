const mongoose = require("mongoose");
const validator = require("validator");
const photoSchema = new mongoose.Schema(
  {
    Phototype: {
      type: String,
      enum: ["Personal", "Shared"],
    },
    Url: {
      type: string,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid Photo Url:", value);
        }
      },
    },
    caption: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      Ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
const Photo = mongoose.model("Photo", photoSchema);
module.exports = Photo;
