package com.backend.spring.modules.product.product.services;

import com.backend.spring.modules.product.product.entities.Product;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

public interface ProductService {
    List<Product> findAll();
    Optional<Product> findById(Long id);
    Product save(Product product);
    void deleteById(Long id);
    Product createProduct(Principal principal);
    Product updateProduct(Long productId, Product newProduct);
}
