const ProductModel = require('./ProductModel');

class ProductRepository {
  findAll(keyword = '') {
    const name = {
      $regex: keyword,
      $options: 'i' // case insensitive
    };

    return ProductModel.find({ name });
  }

  findById(id) {
    const product = ProductModel.findById(id);
    return product;
  }

  create(product) {
    const newProduct = ProductModel.create(product);
    return newProduct;
  }
}

const productRepository = new ProductRepository();
module.exports = {
  productRepository
};
