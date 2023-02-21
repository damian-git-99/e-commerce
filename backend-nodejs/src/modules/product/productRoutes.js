const { Router } = require('express');
const { validateJwt } = require('../../shared/middlewares/validateJWT');
const { findAll, findById, createProductReview } = require('./productControllers');
const router = Router();

// @route /api/products
router.route('/')
  .get(findAll);

router.route('/:id/reviews')
  .post(validateJwt, createProductReview);

router.route('/:id')
  .get(findById);

module.exports = {
  productRouter: router
};
