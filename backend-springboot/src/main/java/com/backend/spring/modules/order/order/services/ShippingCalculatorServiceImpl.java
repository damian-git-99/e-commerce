package com.backend.spring.modules.order.order.services;

public class ShippingCalculatorServiceImpl implements ShippingCalculatorService{

    @Override
    public double calculateShippingPrice(double subtotal) {
        return subtotal > 100 ? 0 : 100;
    }

}
