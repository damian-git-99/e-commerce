const { request, response } = require('express');
const ProductService = require('../services/productService');
const asyncHandler = require('express-async-handler');
const productService = new ProductService();

// eslint-disable-next-line no-unused-vars
const findAll = asyncHandler(async (req = request, res = response) => {
  const products = await productService.findAll();
  res.status(200).json(products);
});

const findById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await productService.findById(id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  return res.status(200).json(product);
});

module.exports = {
  findAll,
  findById,
};
