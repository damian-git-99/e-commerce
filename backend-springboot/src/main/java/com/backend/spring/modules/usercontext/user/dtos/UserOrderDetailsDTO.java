package com.backend.spring.modules.usercontext.user.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data @NoArgsConstructor
public class UserOrderDetailsDTO {
    private Long id;
    private String name;
    private String email;
}
