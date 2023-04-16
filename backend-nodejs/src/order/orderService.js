const OrderNotFoundException = require('../utils/errors/OrderNotFoundException');
const OrderModel = require('./OrderModel');
const productService = require('../product/productService');
const { startSession } = require('mongoose');

const createOrder = async (order) => {
  const session = await startSession();
  session.startTransaction();
  try {
    const { total, shippingPrice, taxPrice } = calculateTotal(
      order.orderItems
    );
    order.totalPrice = total;
    order.shippingPrice = shippingPrice;
    order.taxPrice = taxPrice;
    await discountFromStock(order.orderItems);

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    session.endSession();
  }
  return OrderModel.create(order);
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

/**
 * This function discounts the specified quantity of products from stock based on the order items
 * provided.
 */
const discountFromStock = async (orderItems = []) => {
  for (let i = 0; i < orderItems.length; i++) {
    const orderItem = orderItems[i];
    const { product, quantity } = orderItem;
    await productService.findByIdAndDiscountFromStock(product, quantity);
  }
};

const findOrderById = (id) => {
  return OrderModel.findById(id);
};

const findOrderByIdWithUser = async (id) => {
  const order = await OrderModel.findById(id).populate('user', 'name email');
  if (!order) {
    throw new OrderNotFoundException();
  }
  return order;
};

const findOrdersByUser = (userId) => {
  return OrderModel.find({ user: userId });
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

  return await OrderModel.findByIdAndUpdate(orderId, order, { new: true });
};

module.exports = {
  createOrder,
  findOrderById,
  findOrderByIdWithUser,
  findOrdersByUser,
  updateOrderToPaid
};
