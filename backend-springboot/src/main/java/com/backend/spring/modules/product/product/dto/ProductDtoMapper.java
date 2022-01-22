package com.backend.spring.modules.product.product.dto;

import com.backend.spring.modules.product.product.entities.Product;;
import com.backend.spring.shared.AbstractMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ProductDtoMapper extends AbstractMapper<Product, ProductDto> {
    ProductDtoMapper INSTANCE = Mappers.getMapper(ProductDtoMapper.class);

    @Override
    @Mapping(source = "brand.name", target = "brand")
    @Mapping(source = "category.name", target = "category")
    @Mapping(source = "user.id", target = "user")
    ProductDto toDTO(Product entity);

    @Override
    @Mapping(target = "brand.name", source = "brand")
    @Mapping(target = "category.name", source = "category")
    @Mapping(target = "user.id", source = "user")
    Product toEntity(ProductDto dto);

}
