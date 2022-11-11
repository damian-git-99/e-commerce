const InvalidImageException = require('../file/errors/InvalidImageException');
const fileService = require('../file/FileService');
const ProductAlreadyReviewedException = require('./errors/ProductAlreadyReviewedException');
const ProductNotFoundException = require('./errors/ProductNotFoundException');
const { productRepository } = require('./productRepository');

class ProductService {
  createProduct(product) {
    return productRepository.create(product);
  }

  findProductsByKeyword(keyword) {
    return productRepository.findAll(keyword);
  }

  findProductById(id) {
    return productRepository.findById(id);
  }

  async updateProduct(productId, newProduct) {
    const product = await this.findProductById(productId);

    if (!product) {
      throw new ProductNotFoundException();
    }

    return productRepository.update(productId, newProduct);
  }

  async deleteProductById(id) {
    const product = await this.findProductById(id);
    if (!product) {
      throw new ProductNotFoundException();
    }

    await product.remove();
  }

  async addReviewToProduct(productId, review, user) {
    const { rating, comment } = review;
    const product = await this.findProductById(productId);

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

    await productRepository.AddProductReview(product, newReview);
  }

  async updateProductImage(file, productId) {
    if (!file) {
      throw new InvalidImageException('An image does not come');
    }

    const isSupported = await fileService.isSupportedImageType(file.buffer);

    if (!isSupported) {
      throw new InvalidImageException('Image not supported');
    }

    const product = await this.findProductById(productId);

    if (!product) {
      throw new ProductNotFoundException();
    }

    if (product.image.trim() !== '') {
      // delete previous image
      await fileService.deleteImage(product.public_id_image);
    }

    const result = await fileService.uploadImage(file);
    product.image = result.url;
    product.public_id_image = result.public_id;
    // todo: move the product.save to the repository layer
    await product.save();
    return result.url;
  }
}
const productService = new ProductService();
module.exports = productService;
