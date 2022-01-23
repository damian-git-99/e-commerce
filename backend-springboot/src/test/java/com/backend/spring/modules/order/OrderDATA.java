package com.backend.spring.modules.order;

import com.backend.spring.modules.order.order.entities.Order;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

public class OrderDATA {

    public static Order createOrder001() {
        Order order = new Order(1L, 10, 10, 100, new Date());
        return order;
    }

    public static Order createOrder002() {
        Order order = new Order(2L, 20, 20, 200, new Date());
        return order;
    }

    public static List<Order> createOrders() {
        return Arrays.asList(createOrder001(), createOrder002());
    }

}
