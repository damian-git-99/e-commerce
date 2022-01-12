package com.backend.spring.modules.user.user.entities;

import com.backend.spring.modules.order.order.entities.Order;
import com.backend.spring.modules.user.role.Role;
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
    @NotEmpty
    private String password;
    private boolean isAdmin;
    private Date createdAt;
    private Date updatedAt;
    @ManyToMany(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JoinTable(uniqueConstraints = {@UniqueConstraint(columnNames = {"user_id", "roles_id"})})
    private List<Role> roles = new ArrayList<>();
    @OneToMany(cascade = CascadeType.ALL)
    private List<Order> orders = new ArrayList<>();

    public User(Long id, String name, String email, String password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.isAdmin = false;
    }

    public User(String name, String email, boolean isAdmin) {
        this.name = name;
        this.email = email;
        this.isAdmin = isAdmin;
    }

    public User(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    @PrePersist
    private void prePersist() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    public boolean addRole(Role role) {
        return roles.add(role);
    }

    public boolean addRoles(List<Role> roles) {
        for (Role role : roles) {
            if (!addRole(role)) return false;
        }
        return true;
    }

    public void addOrder(Order order){
        order.setUser(this);
        orders.add(order);
    }
}
