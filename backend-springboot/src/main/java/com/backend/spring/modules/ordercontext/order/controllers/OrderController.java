package com.backend.spring.modules.ordercontext.order.controllers;

import com.backend.spring.modules.ordercontext.order.Order;
import com.backend.spring.modules.ordercontext.order.services.OrderService;
import com.backend.spring.shared.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Collections;
import java.util.List;

@Secured("ROLE_USER")
@RequestMapping("/api/orders")
public class OrderController {

    private OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable Long id){
        Order order = orderService.findById(id).orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        return null;
    }

    @GetMapping("/myorders")
    public List<Order> getMyOrders(){
        return Collections.EMPTY_LIST;
    }

}
