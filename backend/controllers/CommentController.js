const AppError = require("../utilities/AppError");
const catchAsync = require("../utilities/catchAsync");
const Comment = require("../models/CommentModel");
const Book = require("../models/BookModel");
const mongoose = require("mongoose");

exports.createComment = catchAsync(async (req, res, next) => {
  if (!req.params.id) return next(new AppError("plz provide book id ", 400));
  if (!req.body.comment) {
    return next(new AppError("comment must have a body", 400));
  }
  const book = await Book.findById(req.params.id);
  if (!book) return next(new AppError("no such book found ", 400));
  const comment = await Comment.create({
    username: req.body.username,
    comment: req.body.comment,
    user: req.user.id,
    book: req.params.id,
  });
  res.status(200).json({
    status: "success",
    message: "comment made",
    comment,
  });
});

exports.updateComment = catchAsync(async (req, res, next) => {
  if (!req.params.id) return next(new AppError("plz provide comment id ", 400));
  if (!req.body.comment) return next(new AppError("plz provide comment ", 400));
  const comment = await Comment.findById(req.params.id);
  if (!comment) return next(new AppError("no such commnet found", 400));
  if (comment.user != req.user.id) {
    return next(
      new AppError("only user who made the comment can update it ", 400)
    );
  }
  comment.comment = req.body.comment;
  await comment.save({ validateBeforeSave: false });
  res.status(200).json({
    status: "success",
    message: "updated comment",
    comment,
  });
});

exports.deleteComment = catchAsync(async (req, res, next) => {
  if (!req.params.id) return next(new AppError("plz porvide comment id ", 400));
  const comment = await Comment.findById(req.params.id);
  if (!comment) return next(new AppError("no such commnet found", 400));
  if (comment.user != req.user.id) {
    return next(
      new AppError("only user who made the comment can update it ", 400)
    );
  }
  await Comment.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
    message: "delete the commnet",
  });
});

exports.getAllComentOnABook = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // Check if the ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(
      new AppError("Invalid book ID. Please provide a valid ID.", 400)
    );
  }

  // Fetch comments for the valid book ID
  const comments = await Comment.find({ book: id });
  res.status(200).json({
    status: "success",
    message: "found the comments",
    comments,
    results: comments.length,
  });
});
