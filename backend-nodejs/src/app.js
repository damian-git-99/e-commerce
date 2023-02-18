const express = require('express');
const morgan = require('morgan');
const { productRouter } = require('./modules/product/productRoutes');
const { errorHandler } = require('./middlewares/errorHandlingMiddleware');
const { userRouter } = require('./modules/user/userRoutes');
const { orderRouter } = require('./modules/order/orderRoutes');
const { authRouter } = require('./modules/auth/AuthRoutes');
const { adminRouter } = require('./modules/admin/adminRoutes');
const config = require('config');
const app = express();
const PAYPAL_CLIENT_ID = config.get('PAYPAL_CLIENT_ID');

app.use(express.json());
// skip morgan if test
app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' }));
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/users', authRouter);
app.use('/api/orders', orderRouter);
app.use('/api', adminRouter);
app.get('/api/config/paypal', (req, res) => {
  res.send(PAYPAL_CLIENT_ID);
});
app.get('/api/config/veifytoken', (req, res) => {

});
app.use(errorHandler);

module.exports = {
  app
};