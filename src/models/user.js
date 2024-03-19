const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    Referrer: {
      type: [String],
      required: true,
    },
    Comments: {
      type: String,
      required: true,
    },
  },

  { collection: "users", strict: false, timestamps: true }
);

const User = mongoose.model("users", usersSchema);

module.exports = User;
