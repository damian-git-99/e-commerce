const OrderNotFoundException = require('./errors/OrderNotFoundException');
const OrderModel = require('./OrderModel');
const { orderDao } = require('./OrderDao');
const productService = require('../product/productService');

class OrderService {
  // todo: rename it to createOrder
  save(order) {
    // todo: must be in a transaction
    // todo: check if the product is in stock
    const { total, shippingPrice, taxPrice } = this.calculateTotal(order.orderItems);
    order.totalPrice = total;
    order.shippingPrice = shippingPrice;
    order.taxPrice = taxPrice;
    this.discountFromStock(order.orderItems);
    const newOrder = OrderModel.create(order);
    return newOrder;
  }

  async discountFromStock(orderItems = []) {
    for (let i = 0; i < orderItems.length; i++) {
      const orderItem = orderItems[i];
      const { product, quantity } = orderItem;
      await productService.findByIdAndDiscountFromStock(product, quantity);
    }
  }

  calculateTotal(orderItems = []) {
    let total = 0;
    for (let i = 0; i < orderItems.length; i++) {
      const orderItem = orderItems[i];
      const { price, quantity } = orderItem;
      total = total + (price * quantity);
    }

    const shippingPrice = total > 100 ? 0 : 100;
    const taxPrice = total * 0.15;
    total = (total + shippingPrice + taxPrice);
    return {
      total,
      shippingPrice,
      taxPrice
    };
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
