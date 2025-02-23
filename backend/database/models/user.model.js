const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address");
        }
      },
    },

    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Is not a strong password");
        }
      },
    },

    age: {
      type: Number,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Others"],
    },

    address: {
      type: String,
    },

    photoUrl: {
      type: String,
    },

    bio: {
      type: String,
      default: "WELCOME!",
    },

    mood: {
      type: String,
      enum: ["Happy", "Sad", "Angry", "Calm", "Excited", "Bored"],
    },

    socialMedia: {
      facebook:{type: String},
      twitter:{type: String},
      instagram:{type:String},
      linkedin:{type: String},
      tiktok:{type: String},
    },
    stats:{
      photos:{type: Number},
      timeline:{type: Number},
      diaries:{type: Number},
    },
    token: {
      type: String,
    },
    tokenExpiresAt:{
      type: Date
    },
    partnerId:{
      type: String
    },
    googleId: {
      type: String,
    },

    facebookId: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
