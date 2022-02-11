const { Router } = require('express');
const { isAdmin, validateJwt } = require('../../middlewares/validateJWT');
const { findAll, findById, deleteProduct, createProduct, updateProduct, createProductReview } = require('./productControllers');
const router = Router();

// @route /api/products
router.route('/').get(findAll).post(validateJwt, isAdmin, createProduct);
router.route('/:id/reviews').post(validateJwt, createProductReview);
router
  .route('/:id')
  .get(findById)
  .delete(validateJwt, isAdmin, deleteProduct)
  .put(validateJwt, isAdmin, updateProduct);

module.exports = {
  productRouter: router
};
