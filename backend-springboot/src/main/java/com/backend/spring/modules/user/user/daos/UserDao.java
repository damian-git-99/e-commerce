package com.backend.spring.modules.user.user.daos;

import com.backend.spring.modules.user.user.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserDao extends JpaRepository<User, Long> {
    Optional<User> findUserByEmail(String email);
}
