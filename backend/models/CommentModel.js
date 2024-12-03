const mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema({
  username: {
    type: String,
    default: "user",
  },
  comment: {
    type: String,
    required: true,
  },
  Time: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    index: true,
  },
  book: {
    type: mongoose.Schema.ObjectId,
    ref: "Book",
    index: true,
  },
});
const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
