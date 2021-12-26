const { request, response } = require('express');
const asyncHandler = require('express-async-handler');
const { OrderService } = require('../services/orderService');
const orderService = new OrderService();

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
  console.log(req.body);
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

module.exports = {
  addOrderItems
};
