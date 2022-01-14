const { Router } = require('express');
const { check } = require('express-validator');
const validateFields = require('../../../middlewares/expressValidator');
const { isAdmin, validateJwt } = require('../../../middlewares/validateJWT');
const { findAll, findById, deleteProduct } = require('../controller/productControllers');
const router = Router();

// @route /api/products
router.get('/', findAll);
router.get('/:id', [
  check('id', 'El id no es valido').notEmpty(),
  validateFields
], findById);
router.route('/:id').delete(validateJwt, isAdmin, deleteProduct);

module.exports = {
  productRouter: router
};
