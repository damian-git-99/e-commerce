package com.backend.spring.modules.product.product.dto;

import com.backend.spring.modules.product.review.Review;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data @NoArgsConstructor
public class ProductDto {

    private Long id;
    private String name;
    private String image;
    private String brand;
    private String category;
    private String description;
    private List<Review> reviews;
    private double price;
    private Date createdAt;
    private Date updatedAt;
    private int numReviews;
    private double rating;
    private Long user;
    private int countInStock;

}
