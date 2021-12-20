package com.backend.spring.modules.usercontext.user.services;

import com.backend.spring.modules.usercontext.role.Role;
import com.backend.spring.modules.usercontext.user.entities.User;

;
import java.util.Optional;

public class USER_DATA {
    public static Optional<User> getUserWithRoles() {
        User user = new User("damian", "damian@gmail.com", false);
        user.setId(1L);
        user.setPassword("12345");
        user.addRole(new Role("User"));
        return Optional.of(user);
    }
}
