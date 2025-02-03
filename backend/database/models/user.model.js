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
      unique: true, // Optional: to ensure no duplicate email IDs
      required: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address", value);
        }
      },
    },

    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword) {
          throw new Error("Is not a strong password", value);
        }
      },
    },

    age: {
      type: Number,
    },

    gender: {
      type: String,
      enum: {
        values: ["Male", "Female", "Others"],
        message: `{VALUE} is not a valid gender type`,
      },
    },

    address: {
      type: String,
      required: true,
    },

    photoUrl: {
      type: String,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid Photo URL:", value);
        }
      },
    },

    bio: {
      type: String,
      default: "WELCOME!",
    },

    otp: {
      type: Number,
    },

    otpExpiry: {
      type: Date,
    },

    token: {
      type: String,
    },

    mood: {
      type: String,
      enum: {
        values: ["Happy", "Sad", "Angry", "Calm", "Excited", "Bored"],
        message: `${values} don't accepted`,
      },
    },

    googleId: {
      type: String,
    },

    facebookId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
