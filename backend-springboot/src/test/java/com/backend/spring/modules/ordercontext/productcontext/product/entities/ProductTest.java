package com.backend.spring.modules.ordercontext.productcontext.product.entities;

import com.backend.spring.modules.ordercontext.productcontext.brand.Brand;
import com.backend.spring.modules.ordercontext.productcontext.category.Category;
import com.backend.spring.modules.ordercontext.productcontext.review.Review;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

class ProductTest {

    private Product product;

    @BeforeEach
    void setUp() {
        Brand brand = new Brand("Apple");
        Category category = new Category("Electronics");
        product = new Product("Airpods Wireless Bluetooth Headphones", "/images/airpods.jpg", brand, category,
                "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working");
        product.setPrice(89.99f);
        product.setNumReviews(12);
        product.setCountInStock(0);
        product.setRating(4.5f);
    }

    @Test
    @DisplayName("should add a review to the product")
    void shouldAddReview() {
        Review review = new Review(1L,"damian",4.5f,"good product");
        int numReviews = product.getNumReviews();

        product.addReview(review);

        assertThat(review).isIn(product.getReviews());
        assertThat(product).isEqualTo(review.getProduct());
        assertThat(product.getNumReviews()).isEqualTo(numReviews + 1);

    }

}