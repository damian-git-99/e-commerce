class ProductOutOfStockException {
  constructor(product) {
    this.status = 400;
    this.message = `Product: ${product} Out Of Stock`;
  };
};
module.exports = ProductOutOfStockException;
