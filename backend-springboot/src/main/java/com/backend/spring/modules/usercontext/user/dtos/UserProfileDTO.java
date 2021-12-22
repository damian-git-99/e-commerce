package com.backend.spring.modules.usercontext.user.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data @NoArgsConstructor
public class UserProfileDTO {
    protected Long id;
    protected String name;
    protected String email;
    protected boolean isAdmin;
}
