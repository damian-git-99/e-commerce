const OrderNotFoundException = require('../../utils/errors/OrderNotFoundException');
const OrderModel = require('../../order/OrderModel');

const updateOrderToDelivered = async (orderId) => {
  const order = await findOrderById(orderId);

  if (!order) {
    throw new OrderNotFoundException();
  };

  order.isDelivered = true;
  order.deliveredAt = Date.now();

  const updatedOrder = await OrderModel
    .findByIdAndUpdate(orderId, order, { new: true });

  return updatedOrder;
};

const findAllOrdersWithUser = () => {
  return OrderModel.find({})
    .populate('user', 'id name');
};

const findOrderById = (id) => {
  return OrderModel.findById(id);
};

module.exports = {
  updateOrderToDelivered,
  findAllOrdersWithUser,
  findOrderById
};
