const OrderNotFoundException = require('../shared/errors/OrderNotFoundException');
const OrderModel = require('./OrderModel');
const orderDao = require('./OrderDao');
const productService = require('../modules/product/productService');

// todo: rename it to createOrder
const save = (order) => {
  // todo: must be in a transaction
  // todo: check if the product is in stock
  const { total, shippingPrice, taxPrice } = calculateTotal(
    order.orderItems
  );
  order.totalPrice = total;
  order.shippingPrice = shippingPrice;
  order.taxPrice = taxPrice;
  discountFromStock(order.orderItems);
  // todo: move this to dao
  const newOrder = OrderModel.create(order);
  return newOrder;
};

const discountFromStock = async (orderItems = []) => {
  for (let i = 0; i < orderItems.length; i++) {
    const orderItem = orderItems[i];
    const { product, quantity } = orderItem;
    await productService.findByIdAndDiscountFromStock(product, quantity);
  }
};

const calculateTotal = (orderItems = []) => {
  let total = 0;
  for (let i = 0; i < orderItems.length; i++) {
    const orderItem = orderItems[i];
    const { price, quantity } = orderItem;
    total = total + price * quantity;
  }

  const shippingPrice = total > 100 ? 0 : 100;
  const taxPrice = total * 0.15;
  total = total + shippingPrice + taxPrice;
  return {
    total,
    shippingPrice,
    taxPrice
  };
};

const findOrderById = (id) => {
  return orderDao.findOrderById(id);
};

const findOrderByIdWithUser = async (id) => {
  const order = await orderDao.findOderByIdWithUser(id);
  if (!order) {
    throw new OrderNotFoundException();
  }
  return order;
};

const findOrdersByUser = (userId) => {
  return orderDao.findOrdersByUser(userId);
};

const updateOrderToPaid = async (orderId, paymentResult) => {
  // eslint-disable-next-line camelcase
  const { id, status, update_time, email_address } = paymentResult;
  const order = await findOrderById(orderId);

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
};

module.exports = {
  save,
  findOrderById,
  findOrderByIdWithUser,
  findOrdersByUser,
  updateOrderToPaid
};
