package com.backend.spring.modules.ordercontext.productcontext.review;

import com.backend.spring.modules.ordercontext.productcontext.product.entities.Product;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity @Table(name = "reviews")
@Data @NoArgsConstructor
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private float rating;
    private String comment;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn()
    private Product product;

    public Review(Long id, String name, float rating, String comment) {
        this.id = id;
        this.name = name;
        this.rating = rating;
        this.comment = comment;
    }
}
