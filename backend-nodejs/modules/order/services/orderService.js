const OrderModel = require('../model/OrderModel');

class OrderService {
  save(order) {
    const newOrder = OrderModel.create(order);
    return newOrder;
  }
}

module.exports = {
  OrderService
};
