package com.backend.spring.modules.ordercontext.productcontext.product.daos;

import com.backend.spring.modules.ordercontext.productcontext.product.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductDao extends JpaRepository<Product,Long> {

}
