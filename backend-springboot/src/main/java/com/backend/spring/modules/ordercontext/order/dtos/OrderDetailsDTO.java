package com.backend.spring.modules.ordercontext.order.dtos;

import com.backend.spring.modules.ordercontext.order_item.OrderItem;
import com.backend.spring.modules.ordercontext.order_item.dtos.OrderItemDTO;
import com.backend.spring.modules.ordercontext.payment_method.PaymentMethod;
import com.backend.spring.modules.ordercontext.payment_result.PaymentResult;
import com.backend.spring.modules.ordercontext.shipping_address.ShippingAddress;
import com.backend.spring.modules.usercontext.user.dtos.UserOrderDetailsDTO;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data @NoArgsConstructor
public class OrderDetailsDTO {

    private Long id;
    private double taxPrice;
    private double shippingPrice;
    private double totalPrice;
    private boolean isPaid;
    private boolean  isDelivered;
    private double itemsPrice;
    private Date createdAt;
    private Date updatedAt;
    private Date paidAt;
    private ShippingAddress shippingAddress;
    private UserOrderDetailsDTO user;
    private PaymentResult paymentResult;
    private PaymentMethod paymentMethod;
    private List<OrderItemDTO> orderItems = new ArrayList<>();

}
