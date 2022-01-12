package com.backend.spring.modules.user.user.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data @NoArgsConstructor
public class UserDetailsDTO {
    private Long id;
    private String name;
    private String email;
}
