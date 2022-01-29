package com.backend.spring.modules.order.order.services;

import org.springframework.stereotype.Service;

@Service
public class TaxCalculatorServiceImpl implements TaxCalculatorService{

    private static double VALUE_ADDED_TAX = 0.16;

    @Override
    public double calculateTax(double subtotal) {
        return subtotal * VALUE_ADDED_TAX;
    }

}
