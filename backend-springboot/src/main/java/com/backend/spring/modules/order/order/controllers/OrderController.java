package com.backend.spring.modules.order.order.controllers;

import com.backend.spring.modules.order.order.dtos.OrderDetailsDTO;
import com.backend.spring.modules.order.order.dtos.OrderDetailsDTOMapper;
import com.backend.spring.modules.order.order.entities.Order;
import com.backend.spring.modules.order.order.dtos.OrderRequestDTO;
import com.backend.spring.modules.order.order.dtos.OrderRequestMapper;
import com.backend.spring.modules.order.order.services.OrderService;
import com.backend.spring.modules.user.user.entities.User;
import com.backend.spring.modules.user.user.services.UserService;
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
    public OrderDetailsDTO getOrderById(@PathVariable Long id){
        Order order = orderService.findById(id).orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        return OrderDetailsDTOMapper.INSTANCE.toDTO(order);
    }

    @GetMapping("/myorders")
    public List<OrderRequestDTO> getMyOrders(Principal principal){
        User user = userService.findByEmail(principal.getName()).orElseThrow(() -> new ResourceNotFoundException("User Not found"));
        return user.getOrders().stream().map(OrderRequestMapper.INSTANCE::toDTO).collect(Collectors.toList());
    }

}
