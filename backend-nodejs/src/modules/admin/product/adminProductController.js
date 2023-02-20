const asyncHandler = require('express-async-handler');
const productService = require('./adminProductService');

// @desc    create a product with sample data.
// @route   POST /api/products
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

  const createdProduct = await productService.createProduct(product);
  res.status(201).json(createdProduct);
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
const deleteProduct = asyncHandler(async (req, res) => {
  await productService.deleteProductById(req.params.id);
  res.json({ message: 'Product removed' });
});

// @desc    Update a product
// @route   PUT /api/products/:id
const updateProduct = asyncHandler(async (req, res) => {
  const updatedProduct = await productService.updateProduct(req.params.id, { ...req.body });
  res.json(updatedProduct);
});

// @desc    Update a image of a product
// @route   PUT /api/products/image/upload/:id
const updateProductImage = asyncHandler(async (req, res) => {
  const newUrl = await productService.updateProductImage(req.file, req.params.id);
  res.send(newUrl);
});

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  updateProductImage
};
