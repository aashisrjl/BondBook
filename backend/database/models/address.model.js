const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {

    location:{
        type:[Number],
        // required:true
    },

    placeName:{
        type:String,
        required:true,
    },

    photoUrl:{
      type: String,
      required:false,
    },

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

  },
  {
    timestamps: true,
  }
);

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
