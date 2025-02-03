const mongoose = require("mongoose");
const validator = require("validator");
const escape = require("escape-html");  // Optional, for sanitizing inputs

const favouriteSchema = new mongoose.Schema(
  {
    favouriteType: {
      type: String,
      enum: {
        values: ["Movie", "Book", "Place", "Others"],
        message: `{VALUE} is not a valid favouriteType. Allowed values are "Movie", "Book", "Place", "Others"`,
      },
      required: [true, "favouriteType is required"],
      // You can add additional checks here if needed
    },

    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [5, "Title must be at least 5 characters long"],
      maxlength: [20, "Title cannot exceed 20 characters"],
      set: (value) => escape(value), // sanitize input
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [5, "Description must be at least 5 characters long"],
      maxlength: [200, "Description cannot exceed 200 characters"],
      set: (value) => escape(value), // sanitize input
    },

    favouriteUrl: {
      type: String,
      required: false,
      validate: {
        validator: (value) => {
          return validator.isURL(value, {
            protocols: ["http", "https"],
            require_protocol: true,  // Ensure that protocol is included
          });
        },
        message: "Invalid URL: {VALUE}. Make sure it includes http or https",
      },
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "userId is required"],  // Ensuring userId is always provided
    },
  },
  {
    timestamps: true,
  }
);



const Favourite = mongoose.model("Favourite", favouriteSchema);

module.exports = Favourite;
