package com.backend.spring.modules.usercontext.user.dtos;

import com.backend.spring.modules.usercontext.user.entities.User;
import com.backend.spring.shared.AbstractConverter;

public class UserDtoConverter extends AbstractConverter<User, UserDTO> {

    @Override
    public User toEntity(UserDTO dto) {
        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());
        return null;
    }

    @Override
    public UserDTO toDTO(User entity) {
        UserDTO dto = new UserDTO();
        dto.setName(entity.getName());
        dto.setEmail(entity.getEmail());
        dto.setPassword(entity.getPassword());
        return dto;
    }

}
