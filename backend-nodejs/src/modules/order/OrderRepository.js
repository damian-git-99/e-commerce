const OrderModel = require('./OrderModel');

class OrderRepository {
  findOderByIdWithUser(id) {
    const order = OrderModel
      .findById(id)
      .populate('user', 'name email');
    return order;
  }
}

const orderRepository = new OrderRepository();

module.exports = {
  orderRepository
};
