import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { orderService } from '../services/OrderService';
import mongoose from 'mongoose';

export const addOrderItems = asyncHandler( async (req: Request, res: Response) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error('No order items');
    }

    const userId = req.user?.id;
    if (!userId) throw Error('Something happened in the server :C');

    const order = {
      orderItems,
      user: new mongoose.Types.ObjectId(userId),
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    };

    const createdOrder = await orderService.save(order);
    res.status(201).json(createdOrder);
  }
);

// @route GET /api/orders/:id
export const getOrderById = asyncHandler( async (req: Request, res: Response) => {
    const order = await orderService.findByIdWithUser(req.params.id);

    if (!order) {
      res.status(404);
      throw new Error('Order not found');
    }

    res.json(order);
  }
);

// @route GET /api/orders/:id/pay
export const updateOrderToPaid = asyncHandler( async (req: Request, res: Response) => {
    const order = await orderService.findById(req.params.id);
    if (!order) {
      res.status(404);
      throw new Error('Order not found');
    }

    order.isPaid = true;
    order.paidAt = new Date();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  }
);

export const getMyOrders = asyncHandler(async (req: Request, res: Response) => {
  const id = req.user?.id;
  if (!id) throw Error('Something happened in the server :C');
  const orders = await orderService.findOrdersByUser(id);
  res.json(orders);
});
