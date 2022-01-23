package com.backend.spring.modules.paypal;

import com.backend.spring.modules.product.brand.BrandDao;
import com.backend.spring.modules.product.category.CategoryDao;
import com.backend.spring.modules.product.product.services.ProductService;
import com.backend.spring.modules.user.user.daos.UserDao;
import com.backend.spring.modules.user.user.services.UserService;
import com.backend.spring.security.jwt.JWTService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.*;

@WebMvcTest(PaypalController.class)
class PaypalControllerTest {

    @Autowired
    private MockMvc mvc;
    @MockBean
    private UserDao userDao;
    @MockBean
    private PasswordEncoder passwordEncoder;
    @MockBean
    private JWTService jwtService;
    @MockBean
    private ProductService productService;
    @MockBean
    private BrandDao brandDao;
    @MockBean
    private CategoryDao categoryDao;
    @MockBean
    private UserService userService;

    @Test
    void name() {
    }
}