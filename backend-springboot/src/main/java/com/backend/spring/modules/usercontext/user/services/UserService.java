package com.backend.spring.modules.usercontext.user.services;

import com.backend.spring.modules.usercontext.user.entities.User;

import java.util.Optional;

public interface UserService {
    public Optional<User> findByEmail(String email);
}
