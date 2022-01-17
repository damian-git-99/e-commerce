import colors from 'colors';
import express from 'express';
import { connectDB } from './db/config';
import dotenv from 'dotenv';
import { errorHandler } from './middlewares/errorHandling';
import { userRouter } from './modules/user/routes/userRoutes';
import { productRouter } from './modules/product/routes/productRoutes';
import { orderRouter } from './modules/order/routes/orderRoutes';
import morgan from 'morgan';
import { uploadRoutes } from './modules/shared/uploadRoutes';
//import path from 'path';
dotenv.config();
// loading colors in ts
colors;
const app = express();
connectDB();
app.use(morgan('combined'));
app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/upload', uploadRoutes);
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});
//app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(errorHandler);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`.blue.underline.bold);
});
