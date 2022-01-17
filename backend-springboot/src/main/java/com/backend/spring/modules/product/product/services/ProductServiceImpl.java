package com.backend.spring.modules.product.product.services;

import com.backend.spring.modules.product.brand.Brand;
import com.backend.spring.modules.product.brand.BrandDao;
import com.backend.spring.modules.product.category.Category;
import com.backend.spring.modules.product.category.CategoryDao;
import com.backend.spring.modules.product.product.daos.ProductDao;
import com.backend.spring.modules.product.product.entities.Product;
import com.backend.spring.modules.user.user.entities.User;
import com.backend.spring.modules.user.user.services.UserService;
import com.backend.spring.shared.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProductServiceImpl implements ProductService{

    private ProductDao productDao;
    private UserService userService;
    private BrandDao brandDao;
    private CategoryDao categoryDao;

    public ProductServiceImpl(ProductDao productDao, UserService userService, BrandDao brandDao, CategoryDao categoryDao) {
        this.productDao = productDao;
        this.userService = userService;
        this.brandDao = brandDao;
        this.categoryDao = categoryDao;
    }

    @Override
    public List<Product> findAll() {
        return productDao.findAll();
    }

    @Override
    public Optional<Product> findById(Long id) {
        return productDao.findById(id);
    }

    @Override
    public Product save(Product product) {
        return productDao.save(product);
    }

    @Override
    public void deleteById(Long id) {
        productDao.deleteById(id);
    }

    @Override
    public Product createProduct(Principal principal) {
        Product product = new Product();
        User user = userService.findByEmail(principal.getName()).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        product.setName("Sample name");
        product.setPrice(0);
        product.setUser(user);
        product.setImage("");
        product.setBrand(new Brand("Sample Brand"));
        product.setCategory(new Category("Sample Category"));
        product.setCountInStock(0);
        product.setNumReviews(0);
        product.setDescription("Sample description");
        productDao.save(product);
        return product;
    }

    @Override
    public Product updateProduct(Long productId, Product newProduct) {
        Product product = findById(productId).orElseThrow(() -> new ResourceNotFoundException("Product Not Found"));
        Optional<Brand> brand = brandDao.findByName(newProduct.getBrand().getName());
        Optional<Category> category = categoryDao.findByName(newProduct.getCategory().getName());
        product.setName(newProduct.getName());
        product.setPrice(newProduct.getPrice());
        product.setImage(newProduct.getImage());
        product.setBrand(brand.orElseGet(newProduct::getBrand));
        product.setCategory(category.orElseGet(newProduct::getCategory));
        product.setCountInStock(newProduct.getCountInStock());
        product.setDescription(newProduct.getDescription());
        productDao.save(product);
        return product;
    }

}
