class ProductAlreadyReviewedException {
  constructor() {
    this.status = 400;
    this.message = 'Product already reviewed';
  };
};
module.exports = ProductAlreadyReviewedException;
