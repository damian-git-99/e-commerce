package com.backend.spring.modules.order.order_item.dtos;


import lombok.Data;
import lombok.NoArgsConstructor;

@Data @NoArgsConstructor
public class OrderItemDTO {
    private Long id;
    private String name;
    private int quantity;
    private String image;
    private Long product;
    private double price;
}