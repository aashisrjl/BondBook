const mongoose = require("mongoose");
const validator = require("validator");
const chatSchema = new mongoose.Schema({

    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        Ref: 'User',
        required: true
    },
     message:{
        type: String,
    },
    receiverId:{
        type: String

    }
},
{timestamps:true});
  const Chat = mongoose.model("Chat", chatSchema);
  module.exports = Chat;