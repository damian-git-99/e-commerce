import { Order, OrderModel } from '../models/OrderModel';

class OrderService {
  public save(order: Order) {
    const newOrder = OrderModel.create(order);
    return newOrder;
  }

  public findById(id: string) {
    const order = OrderModel.findById(id);
    return order;
  }

  public findByIdWithUser(id: string) {
    const order = OrderModel.findById(id).populate('user', 'name email');
    return order;
  }

  public findOrdersByUser(userId: string) {
    const orders = OrderModel.find({ user: userId });
    return orders;
  }
}

export const orderService = new OrderService();
