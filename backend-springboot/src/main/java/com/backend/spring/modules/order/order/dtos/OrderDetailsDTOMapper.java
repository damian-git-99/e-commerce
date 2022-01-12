package com.backend.spring.modules.order.order.dtos;

import com.backend.spring.modules.order.order.entities.Order;
import com.backend.spring.modules.order.order_item.OrderItem;
import com.backend.spring.modules.order.order_item.dtos.OrderItemDTO;
import com.backend.spring.modules.order.order_item.dtos.OrderItemDTOMapper;
import com.backend.spring.modules.user.user.dtos.UserDetailsDTO;
import com.backend.spring.modules.user.user.dtos.UserDetailsDTOMapper;
import com.backend.spring.modules.user.user.entities.User;
import com.backend.spring.shared.AbstractMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface OrderDetailsDTOMapper extends AbstractMapper<Order, OrderDetailsDTO> {

    OrderDetailsDTOMapper INSTANCE = Mappers.getMapper(OrderDetailsDTOMapper.class);

    @Override
    @Mapping(source = "orderItems", target = "orderItems", qualifiedByName = "orderItemsDTO")
    @Mapping(source = "user", target = "user", qualifiedByName = "UserDetailsDTO")
    @Mapping(source = "paymentMethod.name", target = "paymentMethod")
    OrderDetailsDTO toDTO(Order entity);

    @Override
    @Mapping(source = "orderItems", target = "orderItems", qualifiedByName = "orderItemsEntity")
    @Mapping(target = "user", source = "user", qualifiedByName = "UserDetailsEntity")
    @Mapping(target = "paymentMethod.name", source = "paymentMethod")
    Order toEntity(OrderDetailsDTO dto);

    @Named("orderItemsDTO")
    default List<OrderItemDTO> toOrderItemsDTO(List<OrderItem> items){
        return OrderItemDTOMapper.INSTANCE.toDTOs(items);
    }

    @Named("orderItemsEntity")
    default List<OrderItem> toOrderItemsEntity(List<OrderItemDTO> items){
        return OrderItemDTOMapper.INSTANCE.toEntities(items);
    }

    @Named("UserDetailsDTO")
    default UserDetailsDTO toOrderItemsDTO(User user){
       return UserDetailsDTOMapper.INSTANCE.toDTO(user);
    }

    @Named("UserDetailsEntity")
    default User toOrderItemsEntity(UserDetailsDTO dto){
        return UserDetailsDTOMapper.INSTANCE.toEntity(dto);
    }
}
