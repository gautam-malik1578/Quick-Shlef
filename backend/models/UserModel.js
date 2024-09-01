const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { validate } = require("./BookModel");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "a user must have a name"],
    maxlength: [50, "username can not be larger than 50 char"],
    minlength: [5, "username must be atleast 5 char long"],
  },
  email: {
    type: String,
    required: [true, " a user must have an email id"],
    unique: true,
    validate: [validator.isEmail, "plz enter the right format of the email"],
  },
  password: {
    type: String,
    required: [true, "plz enter a password"],
    minlength: 8,
  },
  confirmPassword: {
    type: String,
    required: [true, "plz enter a confirm password"],
    minlength: 8,
  },
  role: {
    type: String,
    enum: ["admin", "reader", "author"],
    default: "reader",
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
