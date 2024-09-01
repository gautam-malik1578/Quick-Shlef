const express = require("express");
const Router = express.Router();
Router.get("/", getAllUsers).post("/");
module.exports = Router;
