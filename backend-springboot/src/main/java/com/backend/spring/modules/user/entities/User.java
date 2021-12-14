package com.backend.spring.modules.user.entities;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.Date;

@Entity @Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotEmpty
    private String name;
    @NotEmpty
    @Column(unique = true)
    private String email;
    private boolean isAdmin;
    private Date createdAt;
    private Date updatedAt;

    @PrePersist
    private void PrePersist(){
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

}
