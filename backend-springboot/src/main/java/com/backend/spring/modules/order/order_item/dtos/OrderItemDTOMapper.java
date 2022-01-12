package com.backend.spring.modules.order.order_item.dtos;


import com.backend.spring.modules.order.order_item.OrderItem;
import com.backend.spring.shared.AbstractMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface OrderItemDTOMapper extends AbstractMapper<OrderItem, OrderItemDTO> {
    OrderItemDTOMapper INSTANCE = Mappers.getMapper(OrderItemDTOMapper.class);

    @Override
    @Mapping(target = "product", source = "product.id")
    @Mapping(source = "product.price", target = "price")
    OrderItemDTO toDTO(OrderItem entity);

    @Override
    @Mapping(source = "product", target = "product.id")
    OrderItem toEntity(OrderItemDTO dto);
}
