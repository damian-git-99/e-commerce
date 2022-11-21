const mongoose = require('mongoose');
const config = require('config');
const dbConfig = config.get('database');

const connectDB = async () => {
  try {
    await mongoose.connect(dbConfig.URI);
    console.log('The connection with the database was successful'.yellow.underline.bold);
  } catch (error) {
    console.error('ERROR: could not connect to the database'.red.underline.bold);
    process.exit(1);
  }
};

module.exports = connectDB;
