const ProductModel = require('./ProductModel');

const findAll = (keyword = '') => {
  const name = {
    $regex: keyword,
    $options: 'i' // case insensitive
  };

  return ProductModel.find({ name });
};

const findById = (id) => {
  const product = ProductModel.findById(id);
  return product;
};

const AddProductReview = async (product, review) => {
  product.reviews.push(review);
  product.numReviews = product.reviews.length;
  // todo: move the logic of calculating the rating to the service layer
  product.rating =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;
  await product.save();
};

module.exports = {
  findAll,
  findById,
  AddProductReview
};
