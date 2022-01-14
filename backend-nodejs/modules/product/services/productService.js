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

  async deleteById(id) {
    const product = await this.findById(id);
    if (product) {
      await product.remove();
      return true;
    } else {
      return false;
    }
  }
}

module.exports = ProductService;
