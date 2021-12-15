package com.backend.spring.modules.ordercontext.productcontext.category;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity @Table(name = "categories")
@Data @NoArgsConstructor
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String name;

    public Category(String name) {
        this.name = name;
    }
}
