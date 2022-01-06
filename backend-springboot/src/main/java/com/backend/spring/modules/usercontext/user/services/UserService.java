package com.backend.spring.modules.usercontext.user.services;

import com.backend.spring.modules.usercontext.user.entities.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    public Optional<User> findByEmail(String email);
    public User save(User user);
    public User signup(User user);
    public User updateUser(User newUser, User oldUser);
    public List<User> findAll();
    public Optional<User> findById(Long id);
    public void deleteById(Long id);
    public void delete(User user);
    public User updateUserFromAdmin(User newUser, User oldUser);
}
