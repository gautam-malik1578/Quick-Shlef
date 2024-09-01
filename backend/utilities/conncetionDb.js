const mongoose = require("mongoose");
module.exports = async function connectToDatabase(path) {
  try {
    const con = await mongoose.connect(
      path
      // { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("Successfully connected to the database");
    // console.log(con.connection);
  } catch (err) {
    console.error(
      "There was an error connecting to the database:",
      err.message
    );
  }
};
