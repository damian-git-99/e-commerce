const OrderNotFoundException = require('./errors/OrderNotFoundException');
const OrderModel = require('./OrderModel');
const { orderRepository } = require('./OrderRepository');

class OrderService {
  save(order) {
    const newOrder = OrderModel.create(order);
    return newOrder;
  }

  findOrderById(id) {
    const order = OrderModel.findById(id);
    return order;
  }

  async findOrderByIdWithUser(id) {
    const order = await orderRepository.findOderByIdWithUser(id);
    if (!order) {
      throw new OrderNotFoundException();
    }
    return order;
  }

  findOrdersByUser(userId) {
    return orderRepository.findOrdersByUser(userId);
  }

  findAllOrdersWithUser() {
    return orderRepository.findAllOrders();
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

    const updatedOrder = await orderRepository.findByIdAndUpdateOrder(orderId, order);
    return updatedOrder;
  }

  async updateOrderToDelivered(orderId) {
    const order = await this.findOrderById(orderId);

    if (!order) {
      throw new OrderNotFoundException();
    }

    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await orderRepository.findByIdAndUpdateOrder(orderId, order);
    return updatedOrder;
  }
}

module.exports = {
  OrderService
};
