package com.backend.spring;

import com.backend.spring.modules.ordercontext.productcontext.brand.Brand;
import com.backend.spring.modules.ordercontext.productcontext.brand.BrandDao;
import com.backend.spring.modules.ordercontext.productcontext.category.Category;
import com.backend.spring.modules.ordercontext.productcontext.category.CategoryDao;
import com.backend.spring.modules.ordercontext.productcontext.product.entities.Product;
import com.backend.spring.modules.ordercontext.productcontext.product.services.ProductService;
import com.backend.spring.modules.usercontext.user.entities.User;
import com.backend.spring.modules.usercontext.user.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.Transactional;

@SpringBootApplication
public class BackendSpringbootApplication implements CommandLineRunner {

    @Autowired
    private ProductService productService;
    @Autowired
    private BrandDao brandDao;
    @Autowired
    private CategoryDao categoryDao;
    private UserService userService;

    public static void main(String[] args) {
        SpringApplication.run(BackendSpringbootApplication.class, args);
    }

    @Override
	@Transactional
    public void run(String... args) throws Exception {
        importUsers();
        importProducts();
    }

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    private void importUsers(){
        User user = new User("damian","admin@example.com", true);
        user.setPassword("123456");
        userService.save(user);
    }

    private void importProducts(){
        Brand brand = new Brand("Apple");
        Category category = new Category("Electronics");
        brandDao.save(brand);
        categoryDao.save(category);

        Product product = new Product("Airpods Wireless Bluetooth Headphones", "/images/airpods.jpg", brand, category,
                "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working");
        product.setPrice(89.99f);
        product.setNumReviews(12);
        product.setCountInStock(0);
        product.setRating(4.5f);
        //product.setUser(user);

        Product product2 = new Product("iPhone 11 Pro 256GB Memory", "/images/phone.jpg", brand, category,
                "Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life");
        product2.setPrice(599.99f);
        product2.setNumReviews(8);
        product2.setCountInStock(7);
        product2.setRating(4.0f);
        productService.save(product);
        productService.save(product2);
    }
}
