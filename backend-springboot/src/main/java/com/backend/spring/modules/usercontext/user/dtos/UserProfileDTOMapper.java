package com.backend.spring.modules.usercontext.user.dtos;

import com.backend.spring.modules.usercontext.user.entities.User;
import com.backend.spring.shared.AbstractMapper;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserProfileDTOMapper extends AbstractMapper<User, UserProfileDTO> {
    UserProfileDTOMapper INSTANCE = Mappers.getMapper(UserProfileDTOMapper.class);
}
