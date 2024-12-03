const express = require("express");
const Router = express.Router();
const { protect, restrictTo } = require("../controllers/AuthController");
const {
  createComment,
  updateComment,
  deleteComment,
  getAllComentOnABook,
} = require("../controllers/CommentController");
Router.get("/:id", getAllComentOnABook)
  .post("/:id", protect, createComment)
  .put("/:id", protect, updateComment)
  .delete("/:id", protect, deleteComment);

module.exports = Router;
