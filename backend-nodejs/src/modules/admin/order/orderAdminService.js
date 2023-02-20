const { orderDao } = require('../../order/OrderDao');
const OrderNotFoundException = require('../../order/errors/OrderNotFoundException');

class OrderAdminService {
  async updateOrderToDelivered(orderId) {
    const order = await this.findOrderById(orderId);

    if (!order) {
      throw new OrderNotFoundException();
    };

    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await orderDao.findByIdAndUpdateOrder(orderId, order);
    return updatedOrder;
  }

  findAllOrdersWithUser() {
    return orderDao.findAllOrders();
  }

  findOrderById(id) {
    return orderDao.findOrderById(id);
  }
}

module.exports = {
  OrderAdminService
};
