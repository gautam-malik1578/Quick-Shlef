const express = require("express");
const Router = express.Router();
const {
  signup,
  login,
  Verify,
  sendOtp,
} = require("../controllers/AuthController");
Router.post("/login", login);
Router.post("/signup", signup);
Router.route("/verify").post(Verify);
Router.route("/getotp").post(sendOtp);
module.exports = Router;
