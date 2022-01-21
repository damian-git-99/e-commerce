package com.backend.spring.modules.product.review;

import com.backend.spring.modules.product.product.entities.Product;
import com.backend.spring.modules.user.user.entities.User;
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
    private double rating;
    private String comment;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn()
    private Product product;
    @OneToOne
    private User user;

    public Review(Long id, String name, float rating, String comment) {
        this.id = id;
        this.name = name;
        this.rating = rating;
        this.comment = comment;
    }

    public Review(Long id, double rating, String comment) {
        this.id = id;
        this.rating = rating;
        this.comment = comment;
    }
}
