package com.backend.spring.modules.product.product.controllers;

import com.backend.spring.modules.BaseControllerTest;
import com.backend.spring.modules.product.product.ProductDATA;
import com.backend.spring.modules.product.product.dto.ProductDto;
import com.backend.spring.modules.product.product.dto.ProductDtoMapper;
import com.backend.spring.modules.product.product.entities.Product;
import com.backend.spring.modules.product.review.Review;
import com.backend.spring.modules.user.user.entities.User;
import com.backend.spring.modules.user.user.services.USER_DATA;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ProductController.class)
class ProductControllerTest extends BaseControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private WebApplicationContext context;



    ObjectMapper mapper;

    @BeforeEach
    void setUp() {
        mapper = new ObjectMapper();
        mvc = MockMvcBuilders
                .webAppContextSetup(context)
                .apply(SecurityMockMvcConfigurers.springSecurity())
                .build();
    }

    @Test
    void findAll() throws Exception {
        //given
        List<Product> products = ProductDATA.createProducts();
        List<ProductDto> productDtos = ProductDtoMapper.INSTANCE.toDTOs(products);
        given(productService.findAll()).willReturn(products);

        // when / then
        mvc.perform(get("/api/products").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].name").value("Product 001"))
                .andExpect(jsonPath("$[1].name").value("Product 002"))
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(content().json(mapper.writeValueAsString(productDtos)));

        // then
        then(productService).should().findAll();
    }

    @Test
    void findById() throws Exception {
        Product product = ProductDATA.createProduct001();
        given(productService.findById(1L)).willReturn(Optional.of(product));

        mvc.perform(get("/api/products/1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.name").value("Product 001"))
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.price").value(999))
                .andExpect(content().json(mapper.writeValueAsString(ProductDtoMapper.INSTANCE.toDTO(product))));

    }

    @Test
    void deleteProduct() throws Exception {

        mvc.perform(delete("/api/products/1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));

        then(productService).should().deleteById(1L);
    }

    @Test
    void createProduct() {
    }

    @Test
    void updateProduct() {
    }

    // configurar tests con spring security: 10. Spring MVC Test Integration https://docs.spring.io/spring-security/site/docs/4.0.x/reference/htmlsingle/#test-mockmvc
    // https://stackoverflow.com/questions/15203485/spring-test-security-how-to-mock-authentication
    @Test
    void createProductReview() throws Exception {
        Map<String, Object> map = new HashMap<>();
        map.put("message", "Review added");
        Review review = new Review();
        review.setComment("good Product");
        review.setRating(4.5);
        Product product = ProductDATA.createProduct001();
        Optional<User> user = USER_DATA.getUserWithRoles();
        given(productService.findById(1L)).willReturn(Optional.of(product));
        given(userService.findByEmail("damian@gmail.com")).willReturn(user);

        willAnswer(invocationOnMock -> {
            Review r = invocationOnMock.getArgument(1);
            r.setId(1L);
            return null;
        }).given(productService).addReviewToProduct(any(Product.class), any(Review.class), any(User.class));


        mvc.perform(put("/api/products/1/reviews").with(user("damian@gmail.com").password("pass").roles("USER", "ADMIN")).contentType(MediaType.APPLICATION_JSON).content(mapper.writeValueAsString(review)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json(mapper.writeValueAsString(map)));

    }
}