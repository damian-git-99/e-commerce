const { request, response } = require('express');
const asyncHandler = require('express-async-handler');
const { OrderService } = require('../services/orderService');
const orderService = new OrderService();

// @route POST /api/orders
const addOrderItems = asyncHandler(async (req = request, res = response) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  }

  const order = {
    orderItems,
    user: req.user.id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  };

  const createdOrder = await orderService.save(order);
  res.status(201).json(createdOrder);
});

// @route GET /api/orders/:id
const getOrderById = asyncHandler(async (req = request, res = response) => {
  const order = await orderService.findByIdWithUser(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  res.json(order);
});

// @route GET /api/orders/:id/pay
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await orderService.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    update_time: req.body.update_time,
    email_address: req.body.email_address
  };

  const updatedOrder = await order.save();
  return res.json(updatedOrder);
});

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await orderService.findOrdersByUser(req.user.id);
  res.json(orders);
});

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await orderService.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

const getOrders = asyncHandler(async (req, res) => {
  const orders = await orderService.findAllWithUser();
  res.json(orders);
});

module.exports = {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  updateOrderToDelivered,
  getOrders
};
