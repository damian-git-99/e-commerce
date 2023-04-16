const orderDao = require('./orderAdminDao');
const OrderNotFoundException = require('../../utils/errors/OrderNotFoundException');

const updateOrderToDelivered = async (orderId) => {
  const order = await findOrderById(orderId);

  if (!order) {
    throw new OrderNotFoundException();
  };

  order.isDelivered = true;
  order.deliveredAt = Date.now();

  const updatedOrder = await orderDao.findByIdAndUpdateOrder(orderId, order);
  return updatedOrder;
};

const findAllOrdersWithUser = () => {
  return orderDao.findAllOrders();
};

const findOrderById = (id) => {
  return orderDao.findOrderById(id);
};

module.exports = {
  updateOrderToDelivered,
  findAllOrdersWithUser,
  findOrderById
};
