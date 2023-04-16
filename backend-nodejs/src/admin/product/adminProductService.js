const fileService = require('../../file/fileService');
const InvalidImageException = require('../../file/errors/InvalidImageException');
const ProductNotFoundException = require('../../utils/errors/ProductNotFoundException');
const ProductModel = require('../../product/ProductModel');

const createProduct = (product) => {
  return ProductModel.create(product);
};

const findProductById = (id) => {
  return ProductModel.findById(id);
};

const updateProduct = async (productId, newProduct) => {
  const product = await findProductById(productId);

  if (!product) {
    throw new ProductNotFoundException();
  }
  return ProductModel.findByIdAndUpdate(productId, { ...newProduct }, { new: true });
};

const deleteProductById = async (id) => {
  const product = await findProductById(id);
  if (!product) {
    throw new ProductNotFoundException();
  }

  await product.remove();
};

const updateProductImage = async (file, productId) => {
  if (!file) {
    throw new InvalidImageException('An image does not come');
  }

  const isSupported = await fileService.isSupportedImageType(file.buffer);

  if (!isSupported) {
    throw new InvalidImageException('Image not supported');
  }

  const product = await findProductById(productId);

  if (!product) {
    throw new ProductNotFoundException();
  }

  if (product.image.trim() !== '') {
    // delete previous image
    await fileService.deleteImage(product.public_id_image);
  }

  try {
    const result = await fileService.uploadImage(file);
    product.image = result.url;
    product.public_id_image = result.public_id;
    await product.save();
    return result.url;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  createProduct,
  findProductById,
  updateProduct,
  deleteProductById,
  updateProductImage
};
