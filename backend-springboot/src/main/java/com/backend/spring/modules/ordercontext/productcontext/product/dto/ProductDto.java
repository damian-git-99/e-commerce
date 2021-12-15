package com.backend.spring.modules.ordercontext.productcontext.product.dto;

import com.backend.spring.modules.ordercontext.productcontext.review.Review;
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
    private float price;
    private Date createdAt;
    private Date updatedAt;
    private int numReviews;
    private float rating;
    private Long user;
    private int countInStock;

}
