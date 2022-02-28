package com.backend.spring.modules.product.product.controllers;

import com.backend.spring.modules.product.product.dto.ProductDto;
import com.backend.spring.modules.product.product.dto.ProductDtoMapper;
import com.backend.spring.modules.product.product.entities.Product;
import com.backend.spring.modules.product.product.services.ProductService;
import com.backend.spring.modules.product.review.Review;
import com.backend.spring.modules.user.user.entities.User;
import com.backend.spring.modules.user.user.services.UserService;
import com.backend.spring.shared.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;
    private final UserService userService;

    @Autowired
    public ProductController(ProductService productService, UserService userService) {
        this.productService = productService;
        this.userService = userService;
    }

    @GetMapping("")
    @ResponseStatus(HttpStatus.OK)
    public List<ProductDto> findAll(){
        return productService.findAll().stream()
                .map(ProductDtoMapper.INSTANCE::toDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ProductDto findById(@PathVariable(name = "id") Long id){
         Product product = productService.findById(id)
                .orElseThrow(() -> new RuntimeException("error id doesn't exist"));
         return ProductDtoMapper.INSTANCE.toDTO(product);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id){
        var map = new HashMap<String, Object>();
        productService.deleteById(id);
        map.put("message", "Product removed");
        return ResponseEntity.ok(map);
    }

    @PostMapping("")
    @Secured({"ROLE_USER", "ROLE_ADMIN"})
    @ResponseStatus(HttpStatus.CREATED)
    public Product createProduct(Principal principal){
        return productService.createProduct(principal);
    }

    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product product){
        return productService.updateProduct(id, product);
    }

    @PutMapping("/{id}/reviews")
    @Secured({"ROLE_USER"})
    public ResponseEntity<?> createProductReview(@PathVariable Long id, @RequestBody Review review, Principal principal){
        Product product = productService
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product Not Found"));

        User user = userService
                .findByEmail(principal.getName())
                .orElseThrow(() -> new ResourceNotFoundException("User not Found"));
        productService.addReviewToProduct(product, review, user);
        Map<String, Object> map = new HashMap<>();
        map.put("message", "Review added");
        return ResponseEntity.ok(map);
    }

}
