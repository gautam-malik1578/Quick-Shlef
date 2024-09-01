const express = require("express");
const Router = express.Router();
const {
  getAllBooks,
  createBook,
  getBookById,
} = require("../controllers/BooksControllers");
Router.get("/", getAllBooks).post("/", createBook);
Router.get("/:id", getBookById);
module.exports = Router;
