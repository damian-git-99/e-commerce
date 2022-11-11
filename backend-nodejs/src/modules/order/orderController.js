const { request, response } = require('express');
const asyncHandler = require('express-async-handler');
const { OrderService } = require('./orderService');
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
  const order = await orderService.findOrderByIdWithUser(req.params.id);
  res.json(order);
});

// @route PUT /api/orders/:id/pay
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const updatedOrder = await orderService.updateOrderToPaid(req.params.id, req.body);
  return res.json(updatedOrder);
});

// @route GET /api/orders/myorders
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await orderService.findOrdersByUser(req.user.id);
  res.json(orders);
});

// @route PUT /api/orders/:id/deliver
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const updatedOrder = await orderService.updateOrderToDelivered(req.params.id);
  res.json(updatedOrder);
});

// @route GET /api/orders
const getOrders = asyncHandler(async (req, res) => {
  const orders = await orderService.findAllOrdersWithUser();
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
