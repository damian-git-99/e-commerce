package com.backend.spring.modules.ordercontext.order.dtos;

import com.backend.spring.modules.ordercontext.order.entities.Order;
import com.backend.spring.shared.AbstractMapper;

public class OrderDetailsDTOMapper implements AbstractMapper<Order, OrderDetailsDTO> {

    @Override
    public OrderDetailsDTO toDTO(Order entity) {
        return null;
    }

    @Override
    public Order toEntity(OrderDetailsDTO dto) {
        return null;
    }

}
