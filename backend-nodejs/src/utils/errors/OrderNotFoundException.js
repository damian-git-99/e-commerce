class OrderNotFoundException {
  constructor() {
    this.status = 404;
    this.message = 'Order Not Found';
  }
}
module.exports = OrderNotFoundException;
