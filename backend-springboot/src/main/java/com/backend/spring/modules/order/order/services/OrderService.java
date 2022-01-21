package com.backend.spring.modules.order.order.services;

import com.backend.spring.modules.order.order.entities.Order;
import com.backend.spring.modules.order.order.dtos.OrderRequestDTO;
import com.backend.spring.modules.order.order.entities.PaymentResult;
import com.backend.spring.modules.user.user.entities.User;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

public interface OrderService {
    Optional<Order> findById(Long id);
    List<Order> findAll();
    OrderRequestDTO createOrder(OrderRequestDTO orderRequestDTO, User user);
    Order updateOrderToPaid(Long orderId, PaymentResult paymentResult);
    Order updateToDelivered(Long id);
}
