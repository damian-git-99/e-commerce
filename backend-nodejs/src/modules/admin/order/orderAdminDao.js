const OrderModel = require('../../../order/OrderModel');

const findOrderById = (id) => {
  return OrderModel.findById(id);
};

const findAllOrders = () => {
  const orders = OrderModel.find({})
    .populate('user', 'id name');
  return orders;
};

const findByIdAndUpdateOrder = (id, order) => {
  return OrderModel
    .findByIdAndUpdate(id, order, { new: true });
};

module.exports = {
  findOrderById,
  findAllOrders,
  findByIdAndUpdateOrder
};
