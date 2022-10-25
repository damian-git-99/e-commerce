const { request, response } = require('express');
const asyncHandler = require('express-async-handler');
const InvalidImageException = require('../file/errors/InvalidImageException');
const fileService = require('../file/FileService');
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
  const { name, price, description, brand, category, countInStock } =
    req.body;

  const product = await productService.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

const updateProductImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new InvalidImageException('an image does not come');
  }

  if (!fileService.isSupportedFileType(req.file.buffer)) {
    throw new InvalidImageException('Image not supported');
  }

  const product = await productService.findById(req.params.id);

  if (!product) {
    throw new ProductNotFoundException();
  }

  if (product.image.trim() !== '') {
    // delete previous image
    await fileService.deleteImage(product.public_id_image);
  }

  const result = await fileService.uploadImage(req.file);

  productService.updateImage(product.id, result.url, result.public_id);

  res.send(result.url);
});

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await productService.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user.id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user.id
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
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
