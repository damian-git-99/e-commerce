package com.backend.spring.modules.user.user.controllers;

import com.backend.spring.modules.user.user.dtos.UserProfileDTO;
import com.backend.spring.modules.user.user.dtos.UserProfileDTOMapper;
import com.backend.spring.modules.user.user.entities.User;
import com.backend.spring.modules.user.user.services.UserService;
import com.backend.spring.shared.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@Secured("ROLE_ADMIN")
public class AdminController {

    private UserService userService;

    @Autowired
    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @Secured("ROLE_USER")
    @GetMapping("")
    public List<UserProfileDTO> getUsers() {
        return userService.findAll().stream()
                .map(UserProfileDTOMapper.INSTANCE::toDTO)
                .collect(Collectors.toList());
    }

    @DeleteMapping("/{id}")
    public Map<String, Object> deleteUser(@PathVariable(name = "id") Long id, Principal principal) {
        User user = userService.findById(id).orElseThrow(() -> new ResourceNotFoundException("user not found"));
        if (!principal.getName().equals(user.getEmail())) userService.delete(user);
        var map = new HashMap<String, Object>();
        map.put("message", "User Removed");
        return map;
    }

    @GetMapping("/{id}")
    public UserProfileDTO getUserById(@PathVariable(name = "id") Long id) {
        User user = userService.findById(id).orElseThrow(() -> new ResourceNotFoundException("user not found"));
        return UserProfileDTOMapper.INSTANCE.toDTO(user);
    }

    @PutMapping("/{id}")
    public UserProfileDTO updateUser(@PathVariable(name = "id") Long id, @RequestBody UserProfileDTO newUser) {
        User oldUser = userService.findById(id).orElseThrow(() -> new ResourceNotFoundException("user not found"));
        User updatedUser = userService.updateUserFromAdmin(UserProfileDTOMapper.INSTANCE.toEntity(newUser), oldUser);
        return UserProfileDTOMapper.INSTANCE.toDTO(updatedUser);
    }

}
