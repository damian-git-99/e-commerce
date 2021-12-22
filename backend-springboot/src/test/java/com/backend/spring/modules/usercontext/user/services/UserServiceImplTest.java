package com.backend.spring.modules.usercontext.user.services;

import com.backend.spring.modules.usercontext.role.Role;
import com.backend.spring.modules.usercontext.role.RoleDao;
import com.backend.spring.modules.usercontext.user.daos.UserDao;
import com.backend.spring.modules.usercontext.user.entities.User;
import com.backend.spring.shared.exceptions.CustomException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;
import org.mockito.stubbing.Answer;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.atMostOnce;
import static org.mockito.Mockito.never;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
class UserServiceImplTest {

    @Mock
    private UserDao userDao;
    @Mock
    RoleDao roleDao;
    @Mock
    private PasswordEncoder passwordEncoder;

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

    @Test
    @DisplayName("should save an user")
    void shouldSaveUser() {
        User userData = new User("Damian", "damian@gmail.com", "123456");
        given(passwordEncoder.encode(anyString())).willReturn("encrypted password");
        given(userDao.save(any(User.class))).will(new Answer<User>() {
            Long cont = 10L;

            @Override
            public User answer(InvocationOnMock invocationOnMock) throws Throwable {
                User user1 = invocationOnMock.getArgument(0);
                user1.setId(cont++);
                return user1;
            }
        });

        User user = userService.save(userData);

        assertThat(user.getId()).isNotNull().isEqualTo(10L);
        assertThat(user.getPassword()).isEqualTo("encrypted password");
        then(userDao).should(atMostOnce()).save(any(User.class));
        then(passwordEncoder).should(atMostOnce()).encode(anyString());
    }

    @Test
    @DisplayName("should register a user successfully")
    void shouldSignUp(){
        User userData = new User("Damian", "damian@gmail.com", "123456");
        given(userDao.findUserByEmail("damian@gmail.com")).willReturn(Optional.empty());
        given(roleDao.findByName("ROLE_USER")).willReturn(Optional.of(new Role("ROLE_USER")));
        given(userDao.save(any(User.class))).will(new Answer<User>() {
            Long cont = 10L;

            @Override
            public User answer(InvocationOnMock invocationOnMock) throws Throwable {
                User user1 = invocationOnMock.getArgument(0);
                user1.setId(cont++);
                return user1;
            }
        });

        User user = userService.signup(userData);
        assertThat(user.getId()).isEqualTo(10L);
        assertThat(user.getRoles()).isNotEmpty().hasSize(1);
        then(userDao).should(atMostOnce()).findUserByEmail(anyString());
        then(roleDao).should(atMostOnce()).findByName(anyString());
    }

    @Test
    @DisplayName("should fail trying to register a user")
    void shouldFailSignUp(){
        User userData = new User("Damian", "damian@gmail.com", "123456");
        given(userDao.findUserByEmail("damian@gmail.com")).willReturn(Optional.of(userData));
        given(roleDao.findByName("ROLE_USER")).willReturn(Optional.of(new Role("ROLE_USER")));

        Exception exception = assertThrows(CustomException.class, () -> {
            User user = userService.signup(userData);
        });

        assertThat(exception.getClass()).isEqualTo(CustomException.class);
        assertThat(exception.getMessage()).isEqualTo("Email already exists");
        then(roleDao).should(never()).findByName(anyString());
        then(userDao).should(never()).save(any(User.class));
    }

    @Test
    @DisplayName("should update a user")
    void shouldUpdateUser(){
        User user = new User("Damian", "damian@gmail.com", "123456");
        User newUser = new User("Damian actualizado", "damian@gmail.com actualizado", "123456");
        given(userDao.save(any(User.class))).willReturn(user);

        User updatedUser = userService.updateUser(newUser, user);

        assertThat(updatedUser.getName()).isEqualTo("Damian actualizado");
        assertThat(updatedUser.getEmail()).isEqualTo("damian@gmail.com actualizado");
        then(userDao).should(atMostOnce()).save(any(User.class));

    }

}