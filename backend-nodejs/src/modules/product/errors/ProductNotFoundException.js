class ProductNotFoundException {
  constructor() {
    this.status = 404;
    this.message = 'Product Not Found';
  };
};
module.exports = ProductNotFoundException;
