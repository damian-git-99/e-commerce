package com.backend.spring.modules.usercontext.user.entities;

import com.backend.spring.modules.usercontext.role.Role;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity @Table(name = "users")
@Data @NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotEmpty
    private String name;
    @NotEmpty
    @Column(unique = true)
    private String email;
    private String password;
    private boolean isAdmin;
    private Date createdAt;
    private Date updatedAt;
    @ManyToMany
    @JoinTable(uniqueConstraints = {@UniqueConstraint(columnNames = {"user_id", "roles_id"})})
    private List<Role> roles = new ArrayList<>();

    public User(String name, String email, boolean isAdmin) {
        this.name = name;
        this.email = email;
        this.isAdmin = isAdmin;
    }

    @PrePersist
    private void prePersist(){
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    public boolean addRole(Role role) {
        return roles.add(role);
    }
}
