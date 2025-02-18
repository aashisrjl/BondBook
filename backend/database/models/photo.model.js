const mongoose = require("mongoose");
const validator = require("validator");
const photoSchema = new mongoose.Schema(
  {
    Phototype: {
      type: String,
      enum: ["Personal", "Shared"],
      default: "Shared"
    },
    Url: {
      type: String,
    },
    
    type:{
      type: String,
      enum:['photo','video']
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
