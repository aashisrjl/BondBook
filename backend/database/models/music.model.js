const mongoose = require("mongoose");
const validator = require('validator')
const musicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: [5, "Title must be at least 5 characters long"],
      maxlength: [20, "Title cannot exceed 20 characters"],
    },
    musicUrl: {
      type: String,
      required: true,
      trim:true,
      validate(value)
      {
        if(!validator.isURL(value))
        {
           throw new Error("Invalid Photo URL:",value)
        }
      }
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

const Music = mongoose.model("Music", musicSchema);

module.exports = Music;
