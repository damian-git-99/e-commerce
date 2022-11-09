const OrderModel = require('./OrderModel');
const { orderRepository } = require('./OrderRepository');

class OrderService {
  save(order) {
    const newOrder = OrderModel.create(order);
    return newOrder;
  }

  findById(id) {
    const order = OrderModel.findById(id);
    return order;
  }

  findByIdWithUser(id) {
    return orderRepository.findOderByIdWithUser(id);
  }

  findOrdersByUser(userId) {
    const orders = OrderModel.find({ user: userId });
    return orders;
  }

  findAllWithUser() {
    return orderRepository.findAllOrders();
  }
}

module.exports = {
  OrderService
};
