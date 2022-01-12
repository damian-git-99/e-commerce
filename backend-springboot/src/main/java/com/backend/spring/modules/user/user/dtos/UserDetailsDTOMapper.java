package com.backend.spring.modules.user.user.dtos;

import com.backend.spring.modules.user.user.entities.User;
import com.backend.spring.shared.AbstractMapper;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserDetailsDTOMapper extends AbstractMapper<User, UserDetailsDTO> {
    UserDetailsDTOMapper INSTANCE = Mappers.getMapper(UserDetailsDTOMapper.class);
}
