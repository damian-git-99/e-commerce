package com.backend.spring.modules.usercontext.user.controllers;

import com.backend.spring.modules.usercontext.user.dtos.*;
import com.backend.spring.modules.usercontext.user.entities.User;
import com.backend.spring.modules.usercontext.user.services.UserService;
import com.backend.spring.shared.BindingResultUtils;
import com.backend.spring.shared.exceptions.CustomException;
import com.backend.spring.shared.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private UserService userService;

    @Autowired
    private UserDtoTokenConverter userDtoTokenConverter;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public UserDtoToken signUp(@RequestBody @Valid User user, BindingResult result){
        if (result.hasErrors()) BindingResultUtils.returnBindingErrors(result);
        User newUser = userService.signup(user);
        return userDtoTokenConverter.toDTO(newUser);
    }

    @Secured("ROLE_USER")
    @GetMapping("/profile")
    public UserProfileDTO getProfile(Principal principal) {
        User user = userService.findByEmail(principal.getName()).orElseThrow(() -> new ResourceNotFoundException("user not found"));
        return UserProfileDTOMapper.INSTANCE.toDTO(user);
    }

    @Secured("ROLE_USER")
    @PutMapping("/profile")
    public UserDtoToken updateUser(@RequestBody User newUser, Principal principal){
        User user = userService.findByEmail(principal.getName()).orElseThrow(() -> new CustomException("User not found in session", HttpStatus.UNAUTHORIZED));
        User updatedUser = userService.updateUser(newUser, user);
        return userDtoTokenConverter.toDTO(updatedUser);
    }

}
