package com.backend.spring.modules.ordercontext.order.services;

import com.backend.spring.modules.ordercontext.order.Order;

import java.util.List;
import java.util.Optional;

public interface OrderService {
    Optional<Order> findById(Long id);
    List<Order> findAll();
}
