package com.backend.spring.modules.usercontext.user.services;

import com.backend.spring.modules.usercontext.role.Role;
import com.backend.spring.modules.usercontext.user.entities.User;

;
import java.util.List;
import java.util.Optional;

public class USER_DATA {

    private USER_DATA(){}

    public static Optional<User> getUserWithRoles() {
        User user = new User("damian", "damian@gmail.com", false);
        user.setId(1L);
        user.setPassword("12345");
        user.addRole(new Role("User"));
        return Optional.of(user);
    }

    public static List<User> getUsers(){
        User user = new User("damian", "damian@gmail.com", false);
        user.setId(1L);
        user.setPassword("12345");
        user.addRole(new Role("User"));

        User user2 = new User("jose", "jose@gmail.com", false);
        user2.setId(3L);
        user2.setPassword("12345");
        user2.addRole(new Role("User"));

        User user3 = new User("jair", "jair@gmail.com", false);
        user3.setId(3L);
        user3.setPassword("12345");
        user3.addRole(new Role("User"));

        return List.of(user, user2, user3);
    }
}
