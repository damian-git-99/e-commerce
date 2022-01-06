package com.backend.spring.modules.ordercontext.order;

import com.backend.spring.modules.ordercontext.order_item.OrderItem;
import com.backend.spring.modules.ordercontext.payment_method.PaymentMethod;
import com.backend.spring.modules.ordercontext.payment_result.PaymentResult;
import com.backend.spring.modules.ordercontext.shipping_address.ShippingAddress;
import com.backend.spring.modules.usercontext.user.entities.User;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity @Table(name = "orders")
@Data @NoArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private double taxPrice;
    private double shippingPrice;
    private double totalPrice;
    private boolean isPaid;
    private boolean  isDelivered;
    private Date createdAt;
    private Date updatedAt;
    private Date paidAt;
    @OneToOne
    private ShippingAddress shippingAddress;
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;
    @OneToOne
    private PaymentResult paymentResult;
    @OneToOne
    private PaymentMethod paymentMethod;
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<OrderItem> orderItems = new ArrayList<>();

}
