package com.backend.spring.modules.order.order.entities;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data @NoArgsConstructor
public class PaymentResult {

    @Id
    private String id;
    private String status;
    @Column(name = "update_time")
    private String update_time;
    @Column(name = "email_address")
    private String email_address;

    

}
