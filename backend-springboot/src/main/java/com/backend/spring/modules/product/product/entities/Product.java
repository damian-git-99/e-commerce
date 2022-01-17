package com.backend.spring.modules.product.product.entities;

import com.backend.spring.modules.product.brand.Brand;
import com.backend.spring.modules.product.category.Category;
import com.backend.spring.modules.product.review.Review;
import com.backend.spring.modules.user.user.entities.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
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
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    private Brand brand;
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    private Category category;
    private String description;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "product")
    private List<Review> reviews = new ArrayList<>();
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private User user;
    private double price;
    private Date createdAt;
    private Date updatedAt;
    private int numReviews;
    private float rating;
    private int countInStock;

    public Product(Long id, String name, String image, Brand brand, Category category, String description) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.brand = brand;
        this.category = category;
        this.description = description;
    }

    public Product(String name, String image, Brand brand, Category category, String description) {
        this.name = name;
        this.image = image;
        this.brand = brand;
        this.category = category;
        this.description = description;
    }

    public void addReview(Review review){
        review.setProduct(this);
        reviews.add(review);
        numReviews++;
    }

    @PrePersist
    private void prePersist(){
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

}
