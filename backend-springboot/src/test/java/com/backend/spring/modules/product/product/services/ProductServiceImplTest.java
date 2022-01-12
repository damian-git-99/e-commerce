package com.backend.spring.modules.product.product.services;

import com.backend.spring.modules.product.brand.Brand;
import com.backend.spring.modules.product.category.Category;
import com.backend.spring.modules.product.product.daos.ProductDao;
import com.backend.spring.modules.product.product.entities.Product;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;
import org.mockito.stubbing.Answer;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.atMostOnce;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
class ProductServiceImplTest {

    @Mock
    private ProductDao productDao;

    @InjectMocks
    private ProductServiceImpl productService;

    @Test
    @DisplayName("Should find all products")
    void shouldFindAll() {
        List<Product> productsData = PRODUCT_DATA.getProducts();
        given(productDao.findAll()).willReturn(productsData);

        List<Product> products = productService.findAll();

        Product product = products.get(0);
        assertThat(products).isNotEmpty().hasSize(3);
        assertThat(product).isNotNull();
        assertThat(product.getId()).isEqualTo(1L);
        assertThat(product.getName()).isEqualTo("Iphone");

        then(productDao).should(atMostOnce()).findAll();
    }

    @Test
    @DisplayName("should find product by id")
    void shouldFindById() {
        Optional<Product> productDATA = PRODUCT_DATA.getProducts().stream().filter(p -> p.getId() == 1L).findFirst();
        given(productDao.findById(1L)).willReturn(productDATA);

        Product product = productService.findById(1L).orElse(null);

        assertThat(product).isNotNull();
        assertThat(product.getId()).isEqualTo(1L);
        assertThat(product.getName()).isEqualTo("Iphone");
        then(productDao).should(atMostOnce()).findById(1L);
    }

    @Test
    @DisplayName("should save a product")
    void shouldSave() {
        Product productData = new Product("Galaxy S10", "/image/url3", new Brand("Samsung"), new Category("electronics"), "Description samsung galaxy");
        given(productDao.save(any(Product.class))).will(new Answer<Product>() {
            Long cont = 10L;
            @Override
            public Product answer(InvocationOnMock invocation) throws Throwable {
                Product product1 = invocation.getArgument(0);
                product1.setId(cont++);
                return product1;
            }
        });

        Product product = productService.save(productData);

        assertThat(product.getId()).isNotNull();
        assertThat(product.getName()).isEqualTo("Galaxy S10");
        then(productDao).should(atMostOnce()).save(any(Product.class));
    }
}