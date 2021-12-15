package com.backend.spring.modules.ordercontext.productcontext.brand;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface BrandDao extends JpaRepository<Brand, Long> {

    @Query("SELECT b FROM Brand b WHERE b.name = ?1")
    public Optional<Brand> findByName(String name);

    // public Optional<Brand> findBrandByName(String name);

}
