const OrderModel = require('./OrderModel');

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
    const order = OrderModel.findById(id).populate('user', 'name email');
    return order;
  }

  findOrdersByUser(userId) {
    const orders = OrderModel.find({ user: userId });
    return orders;
  }

  findAllWithUser() {
    const orders = OrderModel.find({}).populate('user', 'id name');
    return orders;
  }
}

module.exports = {
  OrderService
};
