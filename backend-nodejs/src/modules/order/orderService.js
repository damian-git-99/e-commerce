const OrderNotFoundException = require('./errors/OrderNotFoundException');
const OrderModel = require('./OrderModel');
const { orderDao } = require('./OrderDao');

class OrderService {
  save(order) {
    const newOrder = OrderModel.create(order);
    return newOrder;
  }

  findOrderById(id) {
    return orderDao.findOrderById(id);
  }

  async findOrderByIdWithUser(id) {
    const order = await orderDao.findOderByIdWithUser(id);
    if (!order) {
      throw new OrderNotFoundException();
    }
    return order;
  }

  findOrdersByUser(userId) {
    return orderDao.findOrdersByUser(userId);
  }

  findAllOrdersWithUser() {
    return orderDao.findAllOrders();
  }

  async updateOrderToPaid(orderId, paymentResult) {
    // eslint-disable-next-line camelcase
    const { id, status, update_time, email_address } = paymentResult;
    const order = await this.findOrderById(orderId);

    if (!order) {
      throw new OrderNotFoundException();
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id,
      status,
      update_time,
      email_address
    };

    const updatedOrder = await orderDao.findByIdAndUpdateOrder(orderId, order);
    return updatedOrder;
  }

  async updateOrderToDelivered(orderId) {
    const order = await this.findOrderById(orderId);

    if (!order) {
      throw new OrderNotFoundException();
    }

    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await orderDao.findByIdAndUpdateOrder(orderId, order);
    return updatedOrder;
  }
}

const orderService = new OrderService();

module.exports = {
  orderService
};
