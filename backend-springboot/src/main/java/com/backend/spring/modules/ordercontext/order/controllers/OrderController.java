package com.backend.spring.modules.ordercontext.order.controllers;

import com.backend.spring.modules.ordercontext.order.entities.Order;
import com.backend.spring.modules.ordercontext.order.dtos.OrderRequestDTO;
import com.backend.spring.modules.ordercontext.order.dtos.OrderRequestMapper;
import com.backend.spring.modules.ordercontext.order.services.OrderService;
import com.backend.spring.modules.usercontext.user.entities.User;
import com.backend.spring.modules.usercontext.user.services.UserService;
import com.backend.spring.shared.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@Secured("ROLE_USER")
@RequestMapping("/api/orders")
public class OrderController {

    private OrderService orderService;
    private UserService userService;

    @Autowired
    public OrderController(OrderService orderService, UserService userService) {
        this.orderService = orderService;
        this.userService = userService;
    }

    @PostMapping("")
    public OrderRequestDTO addOrderItems(@RequestBody OrderRequestDTO orderRequestDTO,Principal principal){
        return orderService.createOrder(orderRequestDTO, principal);
    }

    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable Long id){
        Order order = orderService.findById(id).orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        return order;
    }

    @GetMapping("/myorders")
    public List<OrderRequestDTO> getMyOrders(Principal principal){
        User user = userService.findByEmail(principal.getName()).orElseThrow(() -> new ResourceNotFoundException("User Not found"));
        return user.getOrders().stream().map(OrderRequestMapper.INSTANCE::toDTO).collect(Collectors.toList());
    }

}
