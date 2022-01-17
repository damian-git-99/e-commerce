package com.backend.spring.modules.order.order.dtos;

import com.backend.spring.modules.order.order_item.dtos.OrderItemDTO;
import com.backend.spring.modules.order.order.entities.PaymentResult;
import com.backend.spring.modules.order.order.entities.ShippingAddress;
import com.backend.spring.modules.user.user.dtos.UserDetailsDTO;
import com.fasterxml.jackson.annotation.JsonProperty;
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
    @JsonProperty("isPaid")
    private boolean isPaid;
    @JsonProperty("isDelivered")
    private boolean isDelivered;
    private Date createdAt;
    private Date updatedAt;
    private Date paidAt;
    private ShippingAddress shippingAddress;
    private UserDetailsDTO user;
    private PaymentResult paymentResult;
    private String paymentMethod;
    private List<OrderItemDTO> orderItems = new ArrayList<>();
    private Date deliveredAt;

}
