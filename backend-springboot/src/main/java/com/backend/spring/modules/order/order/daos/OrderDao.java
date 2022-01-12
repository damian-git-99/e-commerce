package com.backend.spring.modules.order.order.daos;

import com.backend.spring.modules.order.order.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDao extends JpaRepository<Order, Long> {
}
