package com.backend.spring.modules.ordercontext.order.services;

import com.backend.spring.modules.ordercontext.order.entities.Order;
import com.backend.spring.modules.ordercontext.order.dtos.OrderRequestDTO;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

public interface OrderService {
    Optional<Order> findById(Long id);
    List<Order> findAll();
    OrderRequestDTO createOrder(OrderRequestDTO orderRequestDTO, Principal principal);
}
