const express = require("express");
const Router = express.Router();
const {
  getAllBooks,
  createBook,
  getBookById,
} = require("../controllers/BooksControllers");
const { protect, restrictTo } = require("../controllers/AuthController");
Router.get("/", protect, restrictTo("admin"), getAllBooks).post(
  "/",
  createBook
);
Router.get("/:id", getBookById);
module.exports = Router;
