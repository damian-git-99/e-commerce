package com.backend.spring.modules.order.order.controllers;

import com.backend.spring.modules.BaseControllerTest;
import com.backend.spring.modules.order.OrderDATA;
import com.backend.spring.modules.order.order.dtos.OrderDetailsDTO;
import com.backend.spring.modules.order.order.dtos.OrderDetailsDTOMapper;
import com.backend.spring.modules.order.order.entities.Order;
import com.backend.spring.modules.order.order.entities.PaymentResult;
import com.backend.spring.modules.order.order.services.OrderService;
import com.backend.spring.modules.product.product.controllers.ProductController;
import com.backend.spring.modules.user.user.entities.User;
import com.backend.spring.modules.user.user.services.USER_DATA;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.notNullValue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.never;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

import org.springframework.test.web.servlet.request.RequestPostProcessor;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(OrderController.class)
class OrderControllerTest extends BaseControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private WebApplicationContext context;

    @MockBean
    private OrderService orderService;

    SecurityMockMvcRequestPostProcessors.UserRequestPostProcessor principalUser;


    ObjectMapper mapper;

    @BeforeEach
    void setUp() {
        principalUser = user("damian@gmail.com").password("pass").roles("USER", "ADMIN");
        mapper = new ObjectMapper();
        mvc = MockMvcBuilders
                .webAppContextSetup(context)
                .apply(SecurityMockMvcConfigurers.springSecurity())
                .build();
    }

    @Test
    void addOrderItems() {
    }

    @Test
    void getOrderById() throws Exception {
        Order order = OrderDATA.createOrder001();
        given(orderService.findById(1L)).willReturn(Optional.of(order));

        mvc.perform(get("/api/orders/1").with(principalUser).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.totalPrice").value(100))
                .andExpect(jsonPath("$.isPaid").value(false));

        then(orderService).should().findById(1L);
    }

    @Test
    void getMyOrders() throws Exception {
        List<Order> orders = OrderDATA.createOrders();
        User user = USER_DATA.getUserWithRoles().get();
        user.setOrders(orders);
        given(userService.findByEmail("damian@gmail.com")).willReturn(Optional.of(user));

        mvc.perform(get("/api/orders/myorders").with(principalUser).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id").value(1L))
                .andExpect(jsonPath("$[1].id").value(2L));

        then(userService).should().findByEmail("damian@gmail.com");
    }

    @Test
    void updateOrderToPaid() throws Exception {

        PaymentResult paymentResult = new PaymentResult("1234568", "COMPLETED", new Date().toString(), "damian@gmail.com");

        given(orderService.updateOrderToPaid(anyLong(), any(PaymentResult.class))).willAnswer(invocation -> {
            PaymentResult p = invocation.getArgument(1);
            Order order = OrderDATA.createOrder001();
            order.setPaid(true);
            order.setPaidAt(new Date());
            order.setPaymentResult(p);
            return order;
        });

        mvc.perform(put("/api/orders/1/pay").with(principalUser).contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(paymentResult)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.isPaid").value(true))
                .andExpect(jsonPath("$.paidAt").value(notNullValue()))
                .andExpect(jsonPath("$.paymentResult").value(notNullValue()));

    }

    @Test
    void getOrders() throws Exception {
        List<Order> orders = OrderDATA.createOrders();

        given(orderService.findAll()).willReturn(orders);

        mvc.perform(get("/api/orders").with(principalUser).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id").value(1L))
                .andExpect(jsonPath("$[1].id").value(2L));

        then(orderService).should().findAll();
    }

    @Test
    void updateOrderToDelivered() throws Exception {

        given(orderService.updateToDelivered(1L)).willAnswer(invocation -> {
            Order order = OrderDATA.createOrder001();
            order.setDelivered(true);
            order.setDeliveredAt(new Date());
            return order;
        });

        mvc.perform(put("/api/orders/1/deliver").with(principalUser).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.isDelivered").value(true))
                .andExpect(jsonPath("$.deliveredAt").value(notNullValue()));

    }
}