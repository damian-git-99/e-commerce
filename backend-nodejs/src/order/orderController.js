const asyncHandler = require('express-async-handler');
const orderService = require('./orderService');

// @route POST /api/orders
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  }

  const order = {
    orderItems,
    user: req.user.id,
    shippingAddress,
    paymentMethod
  };

  const createdOrder = await orderService.createOrder(order);
  res.status(201).json(createdOrder);
});

// @route GET /api/orders/:id
const getOrderById = asyncHandler(async (req, res) => {
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

module.exports = {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders
};
