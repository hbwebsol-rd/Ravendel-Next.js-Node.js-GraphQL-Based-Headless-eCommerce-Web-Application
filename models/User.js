const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    enum: ["USER", "AUTHOR", "SUBSCRIBER", "MANAGER", "EDITOR"],
    required: true,
    default: "USER"
  },
  // image: {},
  image: String,
  meta: [
    {
      key: {
        type: String,
        required: true
      },
      value: {
        type: String,
        required: true
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  }
});

module.exports = mongoose.model("User", UserSchema);
