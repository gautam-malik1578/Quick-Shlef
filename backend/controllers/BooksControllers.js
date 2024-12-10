const { json } = require("express");
const Book = require("../models/BookModel");
const catchAsync = require("../utilities/catchAsync");
const AppError = require("../utilities/AppError");
const { stringify, parse } = require("flatted");
const fs = require("fs");
const path = require("path");

exports.getAllBooks = catchAsync(async (req, res, next) => {
  const queryObj = { ...req.query };
  const excludedFields = ["page", "sort", "limit", "fields"];
  excludedFields.forEach((el) => delete queryObj[el]); // Remove excluded fields

  console.log("Original query:", req.query);

  // Handle MongoDB operators
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  const finalQueryObj = JSON.parse(queryStr);

  // Parse arrays for fields like genre
  if (finalQueryObj.genre && typeof finalQueryObj.genre === "string") {
    // Remove brackets and split into an array
    const genres = finalQueryObj.genre.replace(/[\[\]]/g, "").split(",");

    // Convert each genre into a case-insensitive regex
    finalQueryObj.genre = {
      $in: genres.map((genre) => new RegExp(`^${genre}$`, "i")), // ^ and $ ensure exact matches
    };
  }
  if (finalQueryObj.title) {
    // here title is a field and i wnat all that mathc the title in a regualr expresion
    finalQueryObj.title = { $regex: new RegExp(finalQueryObj.title, "i") };
  }

  console.log("Final query after adjustments:", finalQueryObj);

  // Build the query
  let query = Book.find(finalQueryObj);

  // Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("likes");
  }

  // Field limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    query = query.select(fields);
  } else {
    query = query.select("-__v");
  }

  // Pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 8;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);

  if (req.query.page) {
    const numBooks = await Book.countDocuments();
    if (skip >= numBooks) {
      throw new AppError("This page does not exist", 404);
    }
  }

  // Execute query
  const books = await query;

  res.status(200).json({
    status: "success",
    results: books.length,
    data: { books },
  });
});

exports.createBook = catchAsync(async (req, res, next) => {
  let { title, author } = req.body;
  title = title.toLowerCase();
  author = author.toLowerCase();
  const book = await Book.create({ ...req.body, title, author });
  res.status(201).json({
    status: "success",
    message: "book created successfully",
    data: {
      book,
    },
  });
});
exports.getBookById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const book = await Book.findById(id, {}, { new: true });
  // console.log("this is what we have --->>>", book);
  if (!book) {
    res.status(404).json({
      status: "success",
      data: { book },
      message: "we found no such book",
    });
  } else {
    res.status(200).json({
      status: "success",
      data: {
        book,
      },
    });
  }
});

exports.downloadBookById = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  // Find our book
  const book = await Book.findById(id);

  // Check if the book exists
  if (!book) {
    return res.status(404).json({
      status: "fail",
      message: "No book found with that ID",
    });
  }
  const filePath = path.join(__dirname, `../books/${book.title}.pdf`);
  // Stream the file to the response   "./controllers/Node.js-Express-in-Action"
  res.download(filePath, `${book.title}.pdf`, (err) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Error downloading Book ",
        error: err.message,
      });
    }
  });
});
