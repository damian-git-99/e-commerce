package com.backend.spring.modules.ordercontext.order_item;

import com.backend.spring.modules.ordercontext.productcontext.product.entities.Product;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity @Table(name = "orders_items")
@Data @NoArgsConstructor
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private int quantity;
    private String image;
    @OneToOne(fetch = FetchType.LAZY)
    private Product product;

}
