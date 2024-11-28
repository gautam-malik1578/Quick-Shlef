const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
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
    lowercase: true,
    validate: [validator.isEmail, "plz enter the right format of the email"],
  },
  password: {
    type: String,
    required: [true, "plz enter a password"],
    minlength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "plz enter a confirm password"], //means a required input
    minlength: 8,
    validate: {
      //this is only goinng to work when we create && save will not work/run on methods like findbyidandupdate
      validator: function (el) {
        return el == this.password;
      },
      message: "the password and current password must match",
    },
  },
  role: {
    type: String,
    enum: ["admin", "reader"],
    default: "reader",
  },
  isPremium: {
    type: Boolean,
    default: false,
  },
  tokens: {
    // a non permium will have 3 limit and a permium will have 6 limit conversion
    type: Number,
    default: 0,
  },
  Otp: {
    type: Number, // we shall keep the opt as a number mate
  },
  otpVaildTime: {
    //this will store the time till we have this user is valid
    type: Date,
    default: Date.now() + 15 * 60 * 1000, // 15 min from now mate in ms
  },
  isVerified: {
    // we shall verfy this lad once the otp matches mate
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  passwordChangedAt: Date,
});
userSchema.pre("save", async function (next) {
  //a middleware
  // Check if the password field has been modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost factor 12
  this.password = await bcrypt.hash(this.password, 12);

  // Remove the confirmPassword field (we don't want to store it in the DB)
  this.confirmPassword = undefined;

  next();
});
// instance method availabe on all the doc of a collection
userSchema.methods.correctPaasowrd = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (jwtTimeStamp) {
  //jwtTimeStamp is in sec
  if (this.passwordChangedAt) {
    //means that password is changed atleast once
    const lastChangedAt = parseInt(this.passwordChangedAt.getTime() / 1000, 10); //now this is in ms
    return jwtTimeStamp < lastChangedAt;
  }
  return false;
};
const User = mongoose.model("User", userSchema);
module.exports = User;
