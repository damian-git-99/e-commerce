const { Router } = require('express');
const { findAll, findById, createProductReview } = require('./productControllers');
const { validateJwt } = require('../utils/middlewares/validateJWT');
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
