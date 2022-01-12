package com.backend.spring.modules.order.order.dtos;

import com.backend.spring.modules.order.order.entities.Order;
import com.backend.spring.modules.order.order_item.OrderItem;
import com.backend.spring.modules.order.order_item.dtos.OrderItemDTO;
import com.backend.spring.modules.order.order_item.dtos.OrderItemDTOMapper;
import com.backend.spring.shared.AbstractMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface OrderRequestMapper extends AbstractMapper<Order, OrderRequestDTO> {

    OrderRequestMapper INSTANCE = Mappers.getMapper(OrderRequestMapper.class);

    @Override
    @Mapping(source = "paymentMethod.name", target = "paymentMethod")
    @Mapping(source = "orderItems", target = "orderItems", qualifiedByName = "orderItemsDTO")
    @Mapping(source = "user.id", target = "user")
    OrderRequestDTO toDTO(Order entity);

    @Override
    @Mapping(target = "paymentMethod.name", source = "paymentMethod")
    @Mapping(source = "orderItems", target = "orderItems", qualifiedByName = "orderItemsEntity")
    @Mapping(target = "user.id", source = "user")
    Order toEntity(OrderRequestDTO dto);

    @Named("orderItemsDTO")
    default List<OrderItemDTO> toOrderItemsDTO(List<OrderItem> items){
        return OrderItemDTOMapper.INSTANCE.toDTOs(items);
    }

    @Named("orderItemsEntity")
    default List<OrderItem> toOrderItemsEntity(List<OrderItemDTO> items){
        return OrderItemDTOMapper.INSTANCE.toEntities(items);
    }
}
