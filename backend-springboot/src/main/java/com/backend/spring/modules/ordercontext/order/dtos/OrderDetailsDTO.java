package com.backend.spring.modules.ordercontext.order.dtos;

import com.backend.spring.modules.ordercontext.order_item.OrderItem;
import com.backend.spring.modules.ordercontext.payment_method.PaymentMethod;
import com.backend.spring.modules.ordercontext.payment_result.PaymentResult;
import com.backend.spring.modules.ordercontext.shipping_address.ShippingAddress;
import com.backend.spring.modules.usercontext.user.entities.User;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class OrderDetailsDTO {

    private Long id;
    private double taxPrice;
    private double shippingPrice;
    private double totalPrice;
    private boolean isPaid;
    private boolean  isDelivered;
    private Date createdAt;
    private Date updatedAt;
    private Date paidAt;
    private ShippingAddress shippingAddress;
    private Long user;
    private PaymentResult paymentResult;
    private PaymentMethod paymentMethod;
    private List<OrderItem> orderItems = new ArrayList<>();

}
