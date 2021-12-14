package com.backend.spring.modules.product.entities;

import lombok.Data;

import javax.persistence.*;

@Entity @Table(name = "products")
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String image;

}
