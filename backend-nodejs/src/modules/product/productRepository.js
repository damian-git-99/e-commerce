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

  update(productId, product) {
    return ProductModel
      .findOneAndUpdate({ id: productId }, { ...product }, { new: true });
  }

  async AddProductReview(product, review) {
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    // todo: move the logic of calculating the rating to the service layer
    product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;
    await product.save();
  }
}

const productRepository = new ProductRepository();
module.exports = {
  productRepository
};
