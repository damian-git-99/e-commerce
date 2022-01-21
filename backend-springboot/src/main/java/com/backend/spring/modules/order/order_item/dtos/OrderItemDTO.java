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

    public OrderItemDTO(Long id, String name, int quantity, Long product) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.product = product;
    }
}
