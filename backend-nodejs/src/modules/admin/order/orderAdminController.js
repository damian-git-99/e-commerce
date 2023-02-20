const asyncHandler = require('express-async-handler');
const { OrderAdminService } = require('./orderAdminService');
const orderService = new OrderAdminService();

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
  updateOrderToDelivered,
  getOrders
};
