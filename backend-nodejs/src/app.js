const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { productRouter } = require('./product/productRoutes');
const { errorHandler } = require('./utils/middlewares/errorHandlingMiddleware');
const { userRouter } = require('./user/userRoutes');
const { orderRouter } = require('./order/orderRoutes');
const { authRouter } = require('./auth/authRoutes');
const { adminRouter } = require('./admin/adminRoutes');
const paypalRoutes = require('./paypal/getToken');
const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(express.json());
// skip morgan if test
app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' }));
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/users', authRouter);
app.use('/api/orders', orderRouter);
app.use('/api', adminRouter);
app.use(paypalRoutes);
app.use(errorHandler);

module.exports = {
  app
};
