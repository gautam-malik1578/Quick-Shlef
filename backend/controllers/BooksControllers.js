const { json } = require("express");
const Book = require("../models/BookModel");
const catchAsync = require("../utilities/catchAsync");
const AppError = require("../utilities/AppError");
const { stringify, parse } = require("flatted");

exports.getAllBooks = catchAsync(async (req, res, next) => {
  const queryObj = { ...req.query };
  const excludedFields = ["page", "sort", "limit", "fields"];
  excludedFields.forEach((el) => delete queryObj[el]); // Remove excluded fields from the query object

  console.log(
    "Received query string:",
    req.query,
    "Filtered query object:",
    queryObj
  );

  // Convert query parameters to MongoDB-compatible format
  // Handle MongoDB operators (e.g., gte, gt, lte, lt) if they are passed in the query string
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  const finalQueryObj = JSON.parse(queryStr);

  console.log("Final query object after replacement:", finalQueryObj);

  // Build the query
  let query = Book.find(finalQueryObj);
  /////////////// implementing sorting
  if (req.query.sort) {
    // query.sort('fieldA fieldB FieldC')
    const str = req.query.sort.split(",").join(" ");
    query = query.sort(str);
  } else {
    query = query.sort("likes");
  }
  ///////field limiting aka projecting/////////////
  if (req.query.fields) {
    const str = req.query.fields.split(",").join(" ");
    // query = query.select("fielda fieldb fieldc");
    query = query.select(str);
  } else {
    query = query.select("-__v");
  }
  // implementing the paging in ////////
  const page = (req.query.page * 1) | 1;
  const limit = req.query.limit || 10;
  // if (req.query.page) {}
  // query = query.skip(2).limit(10); the ammount of result that we want to skip and ammount of result we want at max
  query = query.skip(limit * (page - 1)).limit(limit);
  if (req.query.page) {
    // we do not want to skip more doc then we have so
    const numOfBooks = await Book.countDocuments();
    if ((page - 1) * limit >= numOfBooks) {
      throw new AppError("this page does not exist", 404);
    }
  }

  // Execute the query
  const books = await query;

  res.status(200).json({
    status: "success",
    length: books.length,
    data: {
      books,
    },
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
