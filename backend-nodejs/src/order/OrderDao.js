const OrderModel = require('./OrderModel');

const findOrderById = (id) => {
  return OrderModel.findById(id);
};

const findOderByIdWithUser = (id) => {
  const order = OrderModel.findById(id).populate('user', 'name email');
  return order;
};

const findOrdersByUser = (userId) => {
  const orders = OrderModel.find({ user: userId });
  return orders;
};

const findByIdAndUpdateOrder = (id, order) => {
  return OrderModel.findByIdAndUpdate(id, order, { new: true });
};

module.exports = {
  findOrderById,
  findOderByIdWithUser,
  findOrdersByUser,
  findByIdAndUpdateOrder
};
