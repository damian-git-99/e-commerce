const ProductAlreadyReviewedException = require('./errors/ProductAlreadyReviewedException');
const ProductNotFoundException = require('./errors/ProductNotFoundException');
const productDao = require('./productDao');

const findProductsByKeyword = (keyword) => {
  return productDao.findAll(keyword);
};

const findProductById = (id) => {
  return productDao.findById(id);
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

  await productDao.AddProductReview(product, newReview);
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
