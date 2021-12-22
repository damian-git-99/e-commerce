package com.backend.spring.modules.usercontext.user.controllers;

import com.backend.spring.modules.usercontext.user.dtos.UserProfileDTO;
import com.backend.spring.modules.usercontext.user.dtos.UserProfileDTOConverter;
import com.backend.spring.modules.usercontext.user.entities.User;
import com.backend.spring.modules.usercontext.user.services.UserService;
import com.backend.spring.shared.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private UserService userService;
    @Autowired
    private UserProfileDTOConverter userProfileDTOConverter;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Secured("ROLE_USER")
    @GetMapping("/profile")
    public UserProfileDTO getProfile(Principal principal) {
        User user = userService.findByEmail(principal.getName()).orElseThrow(() -> new ResourceNotFoundException("user not found"));
        return userProfileDTOConverter.toDTO(user);
    }

}
