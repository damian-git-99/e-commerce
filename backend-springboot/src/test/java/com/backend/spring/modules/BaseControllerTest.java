package com.backend.spring.modules;

import com.backend.spring.modules.product.brand.BrandDao;
import com.backend.spring.modules.product.category.CategoryDao;
import com.backend.spring.modules.product.product.services.ProductService;
import com.backend.spring.modules.user.user.daos.UserDao;
import com.backend.spring.modules.user.user.services.UserService;
import com.backend.spring.security.jwt.JWTService;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.password.PasswordEncoder;

// Todos los test de controllers deben de heredar de esta clase ya que sino provoca un error, que basicamente es que no encuntra todas las dependencias en todo el proyecto
// sin importar si no las usas en tu cotroller que vas a testear
public class BaseControllerTest {
    @MockBean
    protected UserDao userDao;
    @MockBean
    protected PasswordEncoder passwordEncoder;
    @MockBean
    protected JWTService jwtService;
    @MockBean
    protected ProductService productService;
    @MockBean
    protected BrandDao brandDao;
    @MockBean
    protected CategoryDao categoryDao;
    @MockBean
    protected UserService userService;
}
