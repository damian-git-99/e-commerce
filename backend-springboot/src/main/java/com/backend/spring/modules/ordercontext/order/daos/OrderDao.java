package com.backend.spring.modules.ordercontext.order.daos;

import com.backend.spring.modules.ordercontext.order.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDao extends JpaRepository<Order, Long> {
}
