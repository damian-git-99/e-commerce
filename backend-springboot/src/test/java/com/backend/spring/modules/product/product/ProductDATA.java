package com.backend.spring.modules.product.product;

import com.backend.spring.modules.product.brand.Brand;
import com.backend.spring.modules.product.category.Category;
import com.backend.spring.modules.product.product.entities.Product;
import org.springframework.security.core.parameters.P;

import java.util.Arrays;
import java.util.List;

public class ProductDATA {

    private ProductDATA() {
    }

    public static Product createProduct001() {
        Product product = new Product(1L, "Product 001", "image", new Brand("Apple"), new Category("Electronics"), "description .......");
        product.setPrice(999);
        product.setNumReviews(0);
        product.setRating(4.5);
        return product;
    }

    public static Product createProduct002() {
        Product product = new Product(2L, "Product 002", "image2", new Brand("Samsung"), new Category("Electronics"), "description2 .......");
        product.setPrice(499);
        product.setNumReviews(10);
        product.setRating(4.5);
        return product;
    }

    public static List<Product> createProducts() {
        List<Product> products = Arrays.asList(createProduct001(), createProduct002());
        return products;
    }

}
