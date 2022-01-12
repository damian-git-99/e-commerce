package com.backend.spring.modules.product.product.services;

import com.backend.spring.modules.product.brand.Brand;
import com.backend.spring.modules.product.category.Category;
import com.backend.spring.modules.product.product.entities.Product;

import java.util.ArrayList;
import java.util.List;

public class PRODUCT_DATA {

    public static List<Product> getProducts() {
        Brand brand = new Brand("Apple");
        Category category = new Category("Electronics");
        List<Product> products = new ArrayList<>();
        products.add(new Product(1L, "Iphone", "/image/url", brand, category, "Description"));
        products.add(new Product(2L, "MackBook", "/image/url2", brand, category, "Description MackBook"));
        products.add(new Product(3L, "Ipad", "/image/url3", brand, category, "Description Ipad"));
        return products;
    }

}
