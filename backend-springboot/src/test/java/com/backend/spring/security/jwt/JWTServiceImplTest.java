package com.backend.spring.security.jwt;

import com.backend.spring.modules.usercontext.user.daos.UserDao;
import com.backend.spring.modules.usercontext.user.entities.User;
import com.backend.spring.shared.exceptions.CustomException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.atLeastOnce;

@ExtendWith(MockitoExtension.class)
class JWTServiceImplTest {

    @Mock
    private UserDao userDao;

    @InjectMocks
    private JWTServiceImpl jwtService;

    @Test
    @DisplayName("should create a token")
    void shouldCreateAccessToken() {
        Optional<User> user = Optional.of(new User(1L, "Damian", "damian@gmail.com", "123456"));
        given(userDao.findUserByEmail("damian@gmail.com")).willReturn(user);

        String token = jwtService.createAccessToken("damian@gmail.com", new HashMap<>());

        assertThat(token).isNotNull().isNotEmpty();
        then(userDao).should(atLeastOnce()).findUserByEmail(anyString());
    }

    @Test
    @DisplayName("should validate a token correctly")
    void shouldValidateToken() {
        Optional<User> user = Optional.of(new User(1L, "Damian", "damian@gmail.com", "123456"));

        given(userDao.findUserByEmail("damian@gmail.com")).willReturn(user);

        String token = "Bearer " + jwtService.createAccessToken("damian@gmail.com", new HashMap<>());
        boolean result = jwtService.validateToken(token);

        assertThat(result).isTrue();
    }

    @Test
    @DisplayName("should fail trying to validate a token")
    void shouldFailValidateToken() {
        Optional<User> user = Optional.of(new User(1L, "Damian", "damian@gmail.com", "123456"));

        given(userDao.findUserByEmail("damian@gmail.com")).willReturn(user);

        Exception exception =  assertThrows(CustomException.class, () -> {
            String token = "Bearer " + jwtService.createAccessToken("damian@gmail.com", new HashMap<>());
            token += "1"; // concatenate a character to make it an invalid token
            boolean result = jwtService.validateToken(token);
        });

        assertThat(exception.getClass()).isEqualTo(CustomException.class);
        assertThat(exception.getMessage()).isEqualTo("Expired or invalid JWT token");
    }
}