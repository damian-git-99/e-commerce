const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();
const { productRouter } = require('./src/modules/product/productRoutes');
const { errorHandler } = require('./src/middlewares/errorHandlingMiddleware');
const { userRouter } = require('./src/modules/user/userRoutes');
const { orderRouter } = require('./src/modules/order/orderRoutes');
const config = require('config');
const { authRouter } = require('./src/modules/auth/AuthRoutes');
const PAYPAL_CLIENT_ID = config.get('PAYPAL_CLIENT_ID');
// app.use(morgan('combined'));
app.use(express.json());
// skip morgan if test
app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' }));
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/users', authRouter);
app.use('/api/orders', orderRouter);
app.get('/api/config/paypal', (req, res) => {
  res.send(PAYPAL_CLIENT_ID);
});
app.get('/api/config/veifytoken', (req, res) => {

});

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(errorHandler);

module.exports = {
  app
};
