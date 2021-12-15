package com.backend.spring.modules.ordercontext.productcontext.product.entities;

import com.backend.spring.modules.ordercontext.productcontext.brand.Brand;
import com.backend.spring.modules.ordercontext.productcontext.category.Category;
import com.backend.spring.modules.ordercontext.productcontext.review.Review;
import com.backend.spring.modules.user.entities.User;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity @Table(name = "products")
@Data @NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String image;
    @OneToOne(fetch = FetchType.LAZY)
    private Brand brand;
    @OneToOne(fetch = FetchType.LAZY)
    private Category category;
    private String description;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "product")
    private List<Review> reviews;
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;
    private float price;
    private Date createdAt;
    private Date updatedAt;
    private int numReviews;
    private float rating;

    @PrePersist
    private void prePersist(){
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

}
