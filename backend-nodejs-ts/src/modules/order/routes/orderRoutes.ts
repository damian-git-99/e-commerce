import {validateJwt} from "../../../middlewares/validateJWT";
import {addOrderItems, getMyOrders, getOrderById, updateOrderToPaid} from "../controllers/orderController";

const { Router } = require('express');
export const orderRouter = Router();

orderRouter.route('/').post(validateJwt, addOrderItems);
orderRouter.route('/myorders').get(validateJwt, getMyOrders);
orderRouter.route('/:id').get(validateJwt, getOrderById);
orderRouter.route('/:id/pay').put(validateJwt, updateOrderToPaid);