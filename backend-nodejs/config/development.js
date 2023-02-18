require('dotenv').config();

const config = {
  database: {
    URI: process.env.MONGO_URI
  },
  port: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
  cloudinary: {
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
  }
};

console.log(config);

module.exports = config;
