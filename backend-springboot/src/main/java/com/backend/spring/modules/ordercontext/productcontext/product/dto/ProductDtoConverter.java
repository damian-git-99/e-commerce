package com.backend.spring.modules.ordercontext.productcontext.product.dto;

import com.backend.spring.modules.ordercontext.productcontext.brand.Brand;
import com.backend.spring.modules.ordercontext.productcontext.category.Category;
import com.backend.spring.modules.ordercontext.productcontext.product.entities.Product;
import com.backend.spring.shared.AbstractConverter;

public class ProductDtoConverter extends AbstractConverter<Product, ProductDto> {

    @Override
    public Product toEntity(ProductDto dto) {
        Product product = new Product();
        product.setId(dto.getId());
        product.setName(dto.getName());
        product.setImage(dto.getImage());
        product.setBrand(new Brand(dto.getBrand()));
        product.setCategory(new Category(dto.getCategory()));
        product.setDescription(dto.getDescription());
        product.setReviews(dto.getReviews());
        product.setPrice(dto.getPrice());
        product.setCreatedAt(dto.getCreatedAt());
        product.setUpdatedAt(dto.getUpdatedAt());
        product.setNumReviews(dto.getNumReviews());
        product.setRating(dto.getRating());
        product.setCountInStock(dto.getCountInStock());
        return product;
    }

    @Override
    public ProductDto toDTO(Product entity) {
        ProductDto dto = new ProductDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setImage(entity.getImage());
        dto.setBrand(entity.getBrand().getName());
        dto.setCategory(entity.getCategory().getName());
        dto.setDescription(entity.getDescription());
        dto.setReviews(entity.getReviews());
        dto.setPrice(entity.getPrice());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());
        dto.setNumReviews(entity.getNumReviews());
        dto.setRating(entity.getRating());
        dto.setCountInStock(entity.getCountInStock());
        if (entity.getUser() != null){
            dto.setUser(entity.getUser().getId());
        }

        return dto;
    }

}
