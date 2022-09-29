const express = require('express');
const path = require('path');
const connectDB = require('./src/config/config');
// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const { productRouter } = require('./src/modules/product/productRoutes');
const { errorHandler } = require('./src/middlewares/errorHandlingMiddleware');
const { userRouter } = require('./src/modules/user/userRoutes');
const { orderRouter } = require('./src/modules/order/orderRoutes');
const morgan = require('morgan');
const { uploadRoutes } = require('./src/modules/shared/uploadRoutes');
const app = express();
const config = require('config');
const PORT = config.get('port');
const PAYPAL_CLIENT_ID = config.get('PAYPAL_CLIENT_ID');

connectDB();
app.use(morgan('combined'));
app.use(express.json());
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/upload', uploadRoutes);
app.get('/api/config/paypal', (req, res) => {
  res.send(PAYPAL_CLIENT_ID);
});
app.get('/api/config/veifytoken', (req, res) => {

});

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`.blue.underline.bold);
});
