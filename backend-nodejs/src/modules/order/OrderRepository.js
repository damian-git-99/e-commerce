const OrderModel = require('./OrderModel');

class OrderRepository {
  findOderByIdWithUser(id) {
    const order = OrderModel
      .findById(id)
      .populate('user', 'name email');
    return order;
  }

  findAllOrders() {
    const orders = OrderModel.find({})
      .populate('user', 'id name');
    return orders;
  }

  findOrdersByUser(userId) {
    const orders = OrderModel.find({ user: userId });
    return orders;
  }
}

const orderRepository = new OrderRepository();

module.exports = {
  orderRepository
};
