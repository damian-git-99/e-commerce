const { Router } = require('express');
const { validateJwt } = require('../utils/middlewares/validateJWT');
const { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders } = require('./orderController.js');
const router = Router();

// route: /api/orders
router.route('/')
  .post(validateJwt, addOrderItems);

router.route('/myorders')
  .get(validateJwt, getMyOrders);

router.route('/:id')
  .get(validateJwt, getOrderById);

router.route('/:id/pay')
  .put(validateJwt, updateOrderToPaid);

module.exports = {
  orderRouter: router
};
