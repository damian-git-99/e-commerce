package com.backend.spring.modules.user.user.dtos;

import com.backend.spring.modules.user.user.entities.User;
import com.backend.spring.security.jwt.JWTService;
import com.backend.spring.shared.AbstractConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class UserDtoTokenConverter extends AbstractConverter<User, UserDtoToken> {

    @Autowired
    private JWTService jwtService;

    @Override
    public User toEntity(UserDtoToken dto) {
        return null;
    }

    @Override
    public UserDtoToken toDTO(User entity) {
        UserDtoToken dto = new UserDtoToken();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setEmail(entity.getEmail());
        dto.setAdmin(entity.isAdmin());
        dto.setToken(getToken(entity.getId(), entity.getEmail()));
        return dto;
    }

    private String getToken(Long id, String email) {
        Map<String, Object> payload = new HashMap<>();
        payload.put("id", id);
        return jwtService.createAccessToken(email, payload);
    }
}
