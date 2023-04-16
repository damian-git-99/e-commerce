const ProductModel = require('./ProductModel');
const ProductAlreadyReviewedException = require('./errors/ProductAlreadyReviewedException');
const ProductNotFoundException = require('../utils/errors/ProductNotFoundException');

const findProductsByKeyword = (keyword = '') => {
  const name = {
    $regex: keyword,
    $options: 'i' // case insensitive
  };
  return ProductModel.find({ name });
};

const findProductById = (id) => {
  return ProductModel.findById(id);
};

const addReviewToProduct = async (productId, review, user) => {
  const { rating, comment } = review;
  const product = await findProductById(productId);

  if (!product) {
    throw new ProductNotFoundException();
  }

  const alreadyReviewed = product.reviews.find(
    (r) => r.user.toString() === user.id.toString()
  );

  if (alreadyReviewed) {
    throw new ProductAlreadyReviewedException();
  }

  const newReview = {
    name: user.name,
    rating: Number(rating),
    comment,
    user: user.id
  };

  product.reviews.push(newReview);
  product.numReviews = product.reviews.length;
  product.rating =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;
  await product.save();
};

const findByIdAndDiscountFromStock = async (id, quantity) => {
  const product = await findProductById(id);
  product.countInStock = product.countInStock - quantity;
  await product.save();
};

module.exports = {
  findProductsByKeyword,
  findProductById,
  addReviewToProduct,
  findByIdAndDiscountFromStock
};
