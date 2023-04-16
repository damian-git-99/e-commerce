const asyncHandler = require('express-async-handler');
const productService = require('./productService');
const ProductNotFoundException = require('../utils/errors/ProductNotFoundException');

// @desc    Fetch all products
// @route   GET /api/products
const findAll = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword;
  const products = await productService.findProductsByKeyword(keyword);
  res.status(200).json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
const findById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await productService.findProductById(id);
  if (!product) {
    throw new ProductNotFoundException();
  }

  return res.status(200).json(product);
});

// @desc    Create a product review
// @route   POST /api/products/:id/reviews
const createProductReview = asyncHandler(async (req, res) => {
  await productService.addReviewToProduct(req.params.id, req.body, req.user);
  res.status(201).json({ message: 'Review added' });
});

module.exports = {
  findAll,
  findById,
  createProductReview
};
