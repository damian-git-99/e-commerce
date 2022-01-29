package com.backend.spring.modules.order.order.services;

import com.backend.spring.modules.order.order.dtos.OrderRequestDTO;

public interface TaxCalculatorService {

    double calculateTax(double subtotal);

}
