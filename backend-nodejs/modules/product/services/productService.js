const ProductModel = require('../model/ProductModel');

class ProductService {
  findAll() {
    const products = ProductModel.find({});
    return products;
  }

  findById(id) {
    const product = ProductModel.findById(id);    
    return product;
  }
}

module.exports = ProductService;
