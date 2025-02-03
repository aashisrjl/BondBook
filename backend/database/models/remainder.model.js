const mongoose = require("mongoose");
const validator = require("validator");
const remainderSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    date: {
      type: Date,
    },
    isNotified: {
      type: Boolean,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      Ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Remainder = mongoose.model("Remainder", remainderSchema);
module.exports = Remainder;
