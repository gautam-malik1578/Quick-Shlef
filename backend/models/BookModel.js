const mongoose = require("mongoose");
const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, "a book must have a title"],
      trim: true,
      maxlength: [100, "a book title can not have more than 100 char"],
      minlength: [1, "a book title must have a length "],
      //   collation: { locale: "en", strength: 2 }, // Case-insensitive collation
    },
    author: {
      type: String,
      required: [true, "a book must have author"],
      trim: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    genre: {
      type: [String],
    },
    releasedYear: {
      type: Number,
      default: 0,
    },
    available: {
      type: Boolean,
      default: false,
    },
    size: {
      type: Number,
      default: 0,
    },
    about: {
      type: String,
      default: "no description found",
    },
    imgUrl: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.quora.com%2FWhat-is-a-PDF&psig=AOvVaw09is6oCYcIMe97iO_nHsyw&ust=1725177380603000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKjF1N7gnogDFQAAAAAdAAAAABAE",
    },
  }
  //   { collation: { locale: "en", strength: 2 } }
);
const Book = mongoose.model("Book", BookSchema);
// Ensure the indexes are created
Book.init()
  .then(() => {
    console.log("Indexes are created.");
  })
  .catch((err) => {
    console.error("Index creation failed:", err);
  });
module.exports = Book;
