package com.backend.spring.modules.user.user.services;

import com.backend.spring.modules.user.role.Role;
import com.backend.spring.modules.user.role.RoleDao;
import com.backend.spring.modules.user.user.daos.UserDao;
import com.backend.spring.modules.user.user.entities.User;
import com.backend.spring.shared.exceptions.CustomException;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@Log4j2
public class UserServiceImpl implements UserService, UserDetailsService {

    private UserDao userDao;
    private PasswordEncoder passwordEncoder;
    private RoleDao roleDao;

    @Autowired
    public UserServiceImpl(UserDao userDao, PasswordEncoder passwordEncoder, RoleDao roleDao) {
        this.userDao = userDao;
        this.passwordEncoder = passwordEncoder;
        this.roleDao = roleDao;
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userDao.findUserByEmail(email);
    }

    @Override
    public User save(User user) {
        if (user.getPassword() != null) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        return userDao.save(user);
    }

    @Override
    public User signup(User user) {
        Optional<User> persistedUser = this.findByEmail(user.getEmail());
        if (persistedUser.isPresent()) throw new CustomException("Email already exists", HttpStatus.BAD_REQUEST);

        Optional<Role> role = roleDao.findByName("ROLE_USER");
        if (role.isEmpty()) {
            log.error("Role: ROLE_USER not found");
            throw new CustomException("an error occurred on the server", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        user.addRole(role.get());
        log.info("User with email: " + user.getEmail() + " registered");
        return save(user);
    }

    @Override
    public User updateUser(User newUser, User user) {
        user.setEmail(newUser.getEmail() != null ? newUser.getEmail() : user.getEmail());
        user.setName(newUser.getName() != null ? newUser.getName() : user.getName());
        user.setPassword(newUser.getPassword() != null ? passwordEncoder.encode(newUser.getPassword()): user.getPassword());
        userDao.save(user);
        return user;
    }

    @Override
    public User updateUserFromAdmin(User newUser, User oldUser) {
        oldUser.setEmail(newUser.getEmail() != null ? newUser.getEmail() : oldUser.getEmail());
        oldUser.setName(newUser.getName() != null ? newUser.getName() : oldUser.getName());
        oldUser.setAdmin(newUser.isAdmin() != oldUser.isAdmin() ? newUser.isAdmin() : oldUser.isAdmin());
        userDao.save(oldUser);
        return oldUser;
    }

    @Override
    public List<User> findAll() {
        return userDao.findAll();
    }

    @Override
    public Optional<User> findById(Long id) {
        return userDao.findById(id);
    }

    @Override
    public void deleteById(Long id) {
        userDao.deleteById(id);
    }

    @Override
    public void delete(User user) {
        userDao.delete(user);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = this.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        Collection<? extends GrantedAuthority> authorities = user.getRoles().stream()
                .map(Role::getName)
                .map(SimpleGrantedAuthority::new).collect(Collectors.toList());
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorities);
    }
}
