package com.backend.spring.modules.usercontext.user.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data @NoArgsConstructor
public class UserDTO {
    private String name;
    private String email;
    private String password;
}
