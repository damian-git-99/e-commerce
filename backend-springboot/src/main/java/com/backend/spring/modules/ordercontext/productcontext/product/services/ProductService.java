package com.backend.spring.modules.ordercontext.productcontext.product.services;

import com.backend.spring.modules.ordercontext.productcontext.product.entities.Product;

import java.util.List;
import java.util.Optional;

public interface ProductService {
    List<Product> findAll();
    Optional<Product> findById(Long id);
    Product save(Product product);
}
