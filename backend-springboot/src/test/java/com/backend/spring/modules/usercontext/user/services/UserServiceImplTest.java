package com.backend.spring.modules.usercontext.user.services;

import com.backend.spring.modules.usercontext.user.daos.UserDao;
import com.backend.spring.modules.usercontext.user.entities.User;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.atMostOnce;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
class UserServiceImplTest {

    @Mock
    private UserDao userDao;

    @InjectMocks
    private UserServiceImpl userService;

    @Test
    @DisplayName("should find user by email")
    void findByEmail() {
        given(userDao.findUserByEmail("damian@gmail.com")).willReturn(USER_DATA.getUserWithRoles());

        User user = userService.findByEmail("damian@gmail.com").orElse(null);

        assertThat(user).isNotNull();
        assertThat(user.getEmail()).isEqualTo("damian@gmail.com");
        assertThat(user.getId()).isEqualTo(1L);
        then(userDao).should(atMostOnce()).findUserByEmail("damian@gmail.com");
    }

    @Test
    @DisplayName("should load user by username(email)")
    void shouldLoadUserByUsername() {
        given(userDao.findUserByEmail("damian@gmail.com")).willReturn(USER_DATA.getUserWithRoles());

        UserDetails userDetails = userService.loadUserByUsername("damian@gmail.com");
        assertThat(userDetails.getUsername()).isEqualTo("damian@gmail.com");
        assertThat(userDetails.getPassword()).isEqualTo("12345");
        then(userDao).should(atMostOnce()).findUserByEmail("damian@gmail.com");
    }

    @Test
    @DisplayName("should fail because the email does not exist")
    void shouldFailLoadUserByUsername() {
        given(userDao.findUserByEmail("damian@gmail.com")).willReturn(Optional.empty());

        Exception exception = assertThrows(UsernameNotFoundException.class, () -> {
            UserDetails userDetails = userService.loadUserByUsername("damian@gmail.com");
        });

        assertThat(exception.getClass()).isEqualTo(UsernameNotFoundException.class);
        assertThat(exception.getMessage()).isEqualTo("User not found");
        then(userDao).should(atMostOnce()).findUserByEmail("damian@gmail.com");
    }
}