package com.backend.spring.modules.usercontext.user.dtos;

import com.backend.spring.modules.usercontext.user.entities.User;
import com.backend.spring.shared.AbstractMapper;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserOrderDetailsDTOMapper extends AbstractMapper<User, UserOrderDetailsDTO> {
    UserOrderDetailsDTOMapper INSTANCE = Mappers.getMapper(UserOrderDetailsDTOMapper.class);
}
