package com.backend.spring.modules.order.order.dtos;

import com.backend.spring.modules.order.order_item.dtos.OrderItemDTO;
import com.backend.spring.modules.order.order.entities.ShippingAddress;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data @NoArgsConstructor
public class OrderRequestDTO {
    private Long id;
    private ShippingAddress shippingAddress;
    private String paymentMethod;
    private List<OrderItemDTO> orderItems = new ArrayList<>();
    private double taxPrice;
    private double shippingPrice;
    private double totalPrice;
    private double itemsPrice;
    private Long user;
    private Date createdAt;
}
