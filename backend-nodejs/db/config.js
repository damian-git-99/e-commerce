const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("The connection with the database was successful");
  } catch (error) {
    console.error("ERROR: could not connect to the database");
    process.exit(1);
  }
};

module.exports = connectDB;
