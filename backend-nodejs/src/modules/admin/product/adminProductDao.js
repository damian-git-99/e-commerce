const ProductModel = require('../../../product/ProductModel');

const findById = (id) => {
  const product = ProductModel.findById(id);
  return product;
};

const create = (product) => {
  const newProduct = ProductModel.create(product);
  return newProduct;
};

const update = (productId, product) => {
  return ProductModel.findByIdAndUpdate(productId, { ...product }, { new: true });
};

module.exports = {
  findById,
  create,
  update
};
