const ProductModel = require('./ProductModel');

class ProductRepository {
  findAll(keyword = '') {
    const name = {
      $regex: keyword,
      $options: 'i' // case insensitive
    };

    return ProductModel.find({ name });
  }
}

const productRepository = new ProductRepository();
module.exports = {
  productRepository
};
