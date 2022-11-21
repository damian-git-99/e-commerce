const OrderModel = require('./OrderModel');

class OrderDao {
  findOrderById(id) {
    return OrderModel.findById(id);
  }

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

  findByIdAndUpdateOrder(id, order) {
    return OrderModel
      .findByIdAndUpdate(id, order, { new: true });
  }
}

const orderDao = new OrderDao();

module.exports = {
  orderDao
};
