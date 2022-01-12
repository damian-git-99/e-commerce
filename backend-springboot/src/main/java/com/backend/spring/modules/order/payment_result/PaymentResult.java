package com.backend.spring.modules.order.payment_result;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data @NoArgsConstructor
public class PaymentResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String paypalId;
    private String status;
    @Column(name = "update_time")
    private String updateTime;
    @Column(name = "update_address")
    private String emailAddress;

    

}
