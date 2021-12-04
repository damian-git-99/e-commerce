const express = require("express");
const connectDB = require("./db/config");
const colors = require("colors");
const { productRouter } = require("./modules/product/route/productRoutes");
const app = express();
require("dotenv").config();
connectDB();

app.use('/api/products', productRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`.blue.underline.bold);
});
