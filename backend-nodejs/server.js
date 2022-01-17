const express = require('express');
const path = require('path');
const connectDB = require('./db/config');
// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const { productRouter } = require('./modules/product/route/productRoutes');
const { errorHandler } = require('./middlewares/errorHandlingMiddleware');
const { userRouter } = require('./modules/user/route/userRoutes');
const { orderRouter } = require('./modules/order/routes/orderRoutes');
const morgan = require('morgan');
const { uploadRoutes } = require('./modules/shared/uploadRoutes');
const app = express();
require('dotenv').config();
connectDB();
app.use(morgan('combined'));
app.use(express.json());
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/upload', uploadRoutes);
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});
app.get('/api/config/veifytoken', (req, res) => {

});

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`.blue.underline.bold);
});
