package com.backend.spring.modules.usercontext.user.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Data @NoArgsConstructor
public class UserProfileDTO {
    protected Long id;
    protected String name;
    protected String email;
    @JsonProperty("isAdmin")
    protected boolean isAdmin;
    private Date createdAt;
    private Date updatedAt;
}
