package com.backend.spring.modules.order.order.services;

import org.springframework.stereotype.Service;

@Service
public interface ShippingCalculatorService {

    double calculateShippingPrice(double subtotal);

}
