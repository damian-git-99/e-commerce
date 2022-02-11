const { Router } = require('express');
const { validateJwt, isAdmin } = require('../../../middlewares/validateJWT');
const { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders, updateOrderToDelivered } = require('./orderController.js');
const router = Router();

router.route('/').post(validateJwt, addOrderItems).get(validateJwt, isAdmin, getOrders);
router.route('/myorders').get(validateJwt, getMyOrders);
router.route('/:id').get(validateJwt, getOrderById);
router.route('/:id/pay').put(validateJwt, updateOrderToPaid);
router.route('/:id/deliver').put(validateJwt, isAdmin, updateOrderToDelivered);

module.exports = {
  orderRouter: router
};
