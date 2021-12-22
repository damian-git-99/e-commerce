package com.backend.spring.modules.usercontext.user.dtos;

import com.backend.spring.modules.usercontext.user.entities.User;
import com.backend.spring.shared.AbstractConverter;
import org.springframework.stereotype.Component;

@Component
public class UserProfileDTOConverter extends AbstractConverter<User, UserProfileDTO> {

    @Override
    public User toEntity(UserProfileDTO dto) {
        return null;
    }

    @Override
    public UserProfileDTO toDTO(User entity) {
        UserProfileDTO dto = new UserProfileDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setEmail(entity.getEmail());
        dto.setAdmin(entity.isAdmin());
        return dto;
    }

}
