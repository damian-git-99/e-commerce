const { Router } = require('express');
const { validateJwt } = require('../../../middlewares/validateJWT');
const { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders } = require('../controllers/orderController.js');
const router = Router();

router.route('/').post(validateJwt, addOrderItems);
router.route('/myorders').get(validateJwt, getMyOrders);
router.route('/:id').get(validateJwt, getOrderById);
router.route('/:id/pay').put(validateJwt, updateOrderToPaid);

module.exports = {
  orderRouter: router
};
