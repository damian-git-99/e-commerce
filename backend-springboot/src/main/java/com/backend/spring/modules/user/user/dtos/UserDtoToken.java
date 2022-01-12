package com.backend.spring.modules.user.user.dtos;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data @NoArgsConstructor
public class UserDtoToken extends UserProfileDTO{
    protected String token;
}
