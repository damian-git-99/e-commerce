package com.backend.spring.modules.product.product.daos;

import com.backend.spring.modules.product.product.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductDao extends JpaRepository<Product,Long> {

}
