const express = require("express");
const Router = express.Router();
const {
  getAllBooks,
  createBook,
  getBookById,
  downloadBookById,
} = require("../controllers/BooksControllers");
const { protect, restrictTo } = require("../controllers/AuthController");
Router.get("/", getAllBooks).post(
  "/",
  protect,
  restrictTo("admin"),
  createBook
);
Router.get("/download/:id", downloadBookById);
Router.get("/:id", getBookById);
module.exports = Router;
///https:// api/v1/books/get
