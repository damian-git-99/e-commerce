import { validateJwt, isAdmin } from '../../../middlewares/validateJWT';
import { addOrderItems, getMyOrders, getOrderById, updateOrderToPaid, getOrders, updateOrderToDelivered } from '../controllers/orderController';

const { Router } = require('express');
export const orderRouter = Router();

orderRouter.route('/').post(validateJwt, addOrderItems).get(validateJwt, isAdmin, getOrders);
orderRouter.route('/myorders').get(validateJwt, getMyOrders);
orderRouter.route('/:id').get(validateJwt, getOrderById);
orderRouter.route('/:id/pay').put(validateJwt, updateOrderToPaid);
orderRouter.route('/:id/deliver').put(validateJwt, isAdmin, updateOrderToDelivered);