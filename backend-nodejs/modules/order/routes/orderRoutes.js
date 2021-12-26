const { Router } = require('express');
const { validateJwt } = require('../../../middlewares/validateJWT');
const { addOrderItems } = require('../controllers/orderController.js');
const router = Router();

router.route('/').post(validateJwt, addOrderItems);

module.exports = {
  orderRouter: router
};
