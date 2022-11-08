const { request, response } = require('express');
const asyncHandler = require('express-async-handler');
const ProductNotFoundException = require('./errors/ProductNotFoundException');
const productService = require('./productService');

// @desc    Fetch all products
// @route   GET /api/products
const findAll = asyncHandler(async (req = request, res = response) => {
  const keyword = req.query.keyword;
  const products = await productService.find(keyword);
  res.status(200).json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
const findById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await productService.findById(id);
  if (!product) {
    throw new ProductNotFoundException();
  }

  return res.status(200).json(product);
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
const deleteProduct = asyncHandler(async (req, res) => {
  await productService.deleteById(req.params.id);
  res.json({ message: 'Product removed' });
});

// @desc    Create a product
// @route   POST /api/products
// create a product with sample data and then update it
const createProduct = asyncHandler(async (req, res) => {
  const product = {
    name: 'Sample name',
    price: 0,
    user: req.user.id,
    image: '',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description'
  };

  const createdProduct = await productService.create(product);
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
const updateProduct = asyncHandler(async (req, res) => {
  const updatedProduct = await productService.updateProduct(req.params.id, { ...req.body });
  res.json(updatedProduct);
});

const updateProductImage = asyncHandler(async (req, res) => {
  const newUrl = await productService.updateImage(req.file, req.params.id);
  res.send(newUrl);
});

const createProductReview = asyncHandler(async (req, res) => {
  await productService.addReview(req.params.id, req.body, req.user);
  res.status(201).json({ message: 'Review added' });
});

module.exports = {
  findAll,
  findById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  updateProductImage
};
