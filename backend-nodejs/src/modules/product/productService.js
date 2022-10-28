const InvalidImageException = require('../file/errors/InvalidImageException');
const fileService = require('../file/FileService');
const ProductNotFoundException = require('./errors/ProductNotFoundException');
const { productRepository } = require('./productRepository');

class ProductService {
  create(product) {
    return productRepository.create(product);
  }

  find(keyword) {
    return productRepository.findAll(keyword);
  }

  findById(id) {
    return productRepository.findById(id);
  }

  async updateProduct(productId, newProduct) {
    const product = await this.findById(productId);

    if (!product) {
      throw new ProductNotFoundException();
    }

    return productRepository.update(productId, newProduct);
  }

  async deleteById(id) {
    const product = await this.findById(id);
    if (!product) {
      throw new ProductNotFoundException();
    }

    await product.remove();
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

  async updateImage(file, productId) {
    if (!file) {
      throw new InvalidImageException('An image does not come');
    }

    const isSupported = await fileService.isSupportedFileType(file.buffer);

    if (!isSupported) {
      throw new InvalidImageException('Image not supported');
    }

    const product = await productService.findById(productId);

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
    await product.save();
    return result.url;
  }
}
const productService = new ProductService();
module.exports = productService;
