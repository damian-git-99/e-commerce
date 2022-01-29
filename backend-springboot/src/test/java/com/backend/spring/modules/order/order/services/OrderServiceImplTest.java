package com.backend.spring.modules.order.order.services;

import com.backend.spring.modules.order.order.daos.OrderDao;
import com.backend.spring.modules.order.order.dtos.OrderRequestDTO;
import com.backend.spring.modules.order.order.entities.Order;
import com.backend.spring.modules.order.order.entities.PaymentResult;
import com.backend.spring.modules.order.order_item.dtos.OrderItemDTO;
import com.backend.spring.modules.product.brand.Brand;
import com.backend.spring.modules.product.category.Category;
import com.backend.spring.modules.product.product.daos.ProductDao;
import com.backend.spring.modules.product.product.entities.Product;
import com.backend.spring.modules.product.product.services.ProductService;
import com.backend.spring.modules.user.user.entities.User;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.in;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyDouble;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;


@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
class OrderServiceImplTest {

    @Mock
    private OrderDao orderDao;
    @Mock
    private ProductService productService;
    @Mock
    private TaxCalculatorService taxCalculatorService;
    @Mock
    private ShippingCalculatorService shippingCalculatorService;

    @InjectMocks
    private OrderServiceImpl orderService;

    @Test
    void createOrder() {
        Product productData = new Product("Galaxy S10", "/image/url3", new Brand("Samsung"), new Category("electronics"), "Description samsung galaxy");
        productData.setPrice(599);
        productData.setCountInStock(10);

        Product productData2 = new Product("Galaxy S11", "/image/url4", new Brand("Samsung"), new Category("electronics"), "Description samsung galaxy");
        productData2.setPrice(699);
        productData2.setCountInStock(10);

        Product productData3 = new Product("Galaxy S12", "/image/url5", new Brand("Samsung"), new Category("electronics"), "Description samsung galaxy");
        productData3.setPrice(899);
        productData3.setCountInStock(10);

        OrderItemDTO orderItemDTO = new OrderItemDTO(1L, "product 1", 1, 1L);
        OrderItemDTO orderItemDTO1 = new OrderItemDTO(2L, "product 2", 1, 2L);
        OrderItemDTO orderItemDTO2 = new OrderItemDTO(3L, "product 3", 2, 3L);
        OrderRequestDTO orderRequestDATA = new OrderRequestDTO();
        orderRequestDATA.getOrderItems().addAll(List.of(orderItemDTO, orderItemDTO1, orderItemDTO2));
        User userData = new User("Damian", "damian@gmail.com", "123456");
        System.out.println(productService);
        given(productService.findById(1L)).willReturn(Optional.of(productData));
        given(productService.findById(2L)).willReturn(Optional.of(productData2));
        given(productService.findById(3L)).willReturn(Optional.of(productData3));
        given(taxCalculatorService.calculateTax(anyDouble())).willAnswer(invocation -> {
            double subtotal = invocation.getArgument(0);
            return subtotal * 0.16;
        });
        given(shippingCalculatorService.calculateShippingPrice(anyDouble())).willAnswer(invocation -> {
            double subtotal = invocation.getArgument(0);
            return subtotal > 100 ? 0.0 : 100.0;
        });


        OrderRequestDTO orderRequestDTO = orderService.createOrder(orderRequestDATA, userData);

        assertThat(userData.getOrders()).isNotEmpty();
        assertThat(orderRequestDTO.getTotalPrice()).isEqualTo(3591.36);
        then(orderDao).should().save(any(Order.class));

    }

    @Test
    @DisplayName("should update order to paid")
    void shouldUpdateOrderToPaid() {
        Order orderData = new Order();
        orderData.setId(1L);
        PaymentResult paymentResult = new PaymentResult("123456", "COMPLETED", "01/09/2020", "damiangalvan@gmail.com");
        given(orderDao.findById(1L)).willReturn(Optional.of(orderData));

        Order order = orderService.updateOrderToPaid(1L, paymentResult);
        assertThat(order.isPaid()).isTrue();
        assertThat(order.getPaymentResult()).isNotNull().isEqualTo(paymentResult);
        then(orderDao).should().save(any(Order.class));

    }

    @Test
    @DisplayName("should update to delivered")
    void shouldUpdateToDelivered() {
        Order orderData = new Order();
        orderData.setId(1L);
        given(orderDao.findById(1L)).willReturn(Optional.of(orderData));

        Order order = orderService.updateToDelivered(1L);
        assertThat(order.isDelivered()).isTrue();
        then(orderDao).should().save(any(Order.class));
    }
}