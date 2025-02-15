const mongoose = require("mongoose");

// Connect to MongoDB
const connectDb = async () => {
  await mongoose.connect("mongodb://localhost:27017/my_insta");
  console.log("MongoDB connected...");
};

module.exports = connectDb;
