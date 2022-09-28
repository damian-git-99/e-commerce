const ProductModel = require('./ProductModel');

class ProductService {
  create(product) {
    const newProduct = ProductModel.create(product);
    return newProduct;
  }

  find(options) {
    const products = ProductModel.find(options);
    return products;
  }

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

  async addReview(productId, review, userId) {
    const product = await productService.findById(productId);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === userId.toString()
      );

      if (alreadyReviewed) {
        throw new Error('Product already reviewed');
      }

      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
    } else {
      throw new Error('Product not found');
    }
  }
}
const productService = new ProductService();
module.exports = productService;