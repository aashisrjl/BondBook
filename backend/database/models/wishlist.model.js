const mongoose = require("mongoose");
const validator = require("validator");
const wishlistSchema = new mongoose.Schema(
  {
    item: {
      type: String,
    },
    isComplete: {
      type: Boolean,
    },
    completedAt: {
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

const Wishlist = mongoose.model("Wishlist", wishlistSchema);
module.exports = Wishlist;
