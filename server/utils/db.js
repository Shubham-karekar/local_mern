const mongoose = require("mongoose");
require("dotenv").config;

// const URI =
//   "mongodb+srv://shubhamkarekar20:ShubhamDb@shubhamapi.beud03w.mongodb.net/?retryWrites=true&w=majority&appName=shubhamapi";
//mongoose.connect(URI);

const url=
process.env.MONGODB_URL;

const connectDb = async () => {
  try {
    await mongoose.connect(url);
    console.log("Connection to Database is sucessfully done");
  } catch (error) {
    console.error("Database connection failed");
    //process.exit(0);
  }
};

module.exports = connectDb;
