package com.backend.spring.modules.ordercontext.productcontext.product.controllers;

import com.backend.spring.modules.ordercontext.productcontext.product.dto.ProductDto;
import com.backend.spring.modules.ordercontext.productcontext.product.dto.ProductDtoConverter;
import com.backend.spring.modules.ordercontext.productcontext.product.entities.Product;
import com.backend.spring.modules.ordercontext.productcontext.product.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;
    private final ProductDtoConverter productDtoConverter;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
        this.productDtoConverter = new ProductDtoConverter();
    }

    @GetMapping("")
    @ResponseStatus(HttpStatus.OK)
    public List<ProductDto> findAll(){
        return productService.findAll().stream()
                .map(productDtoConverter::toDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ProductDto findById(@PathVariable(name = "id") Long id){
         Product product = productService.findById(id)
                .orElseThrow(() -> new RuntimeException("error id doesn't exist"));
         return productDtoConverter.toDTO(product);
    }



}
