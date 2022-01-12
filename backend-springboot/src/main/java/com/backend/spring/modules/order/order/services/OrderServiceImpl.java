package com.backend.spring.modules.order.order.services;

import com.backend.spring.modules.order.order.entities.Order;
import com.backend.spring.modules.order.order.daos.OrderDao;
import com.backend.spring.modules.order.order.dtos.OrderRequestDTO;
import com.backend.spring.modules.order.order.dtos.OrderRequestMapper;
import com.backend.spring.modules.order.order_item.dtos.OrderItemDTO;
import com.backend.spring.modules.product.product.entities.Product;
import com.backend.spring.modules.product.product.services.ProductService;
import com.backend.spring.modules.user.user.entities.User;
import com.backend.spring.modules.user.user.services.UserService;
import com.backend.spring.shared.exceptions.CustomException;
import com.backend.spring.shared.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class OrderServiceImpl implements OrderService{

    private OrderDao orderDao;
    private UserService userService;
    private ProductService productService;

    @Autowired
    public OrderServiceImpl(OrderDao orderDao, UserService userService, ProductService productService) {
        this.orderDao = orderDao;
        this.userService = userService;
        this.productService = productService;
    }

    @Override
    public Optional<Order> findById(Long id) {
        return orderDao.findById(id);
    }

    @Override
    public List<Order> findAll() {
        return orderDao.findAll();
    }

    @Override
    public OrderRequestDTO createOrder(OrderRequestDTO orderRequestDTO,Principal principal) {
        Order order = OrderRequestMapper.INSTANCE.toEntity(orderRequestDTO);
        User user = userService.findByEmail(principal.getName()).orElseThrow(() -> new UsernameNotFoundException("User Not found"));
        order.setTotalPrice(calculateTotal(orderRequestDTO));
        user.addOrder(order);
        orderRequestDTO.setTotalPrice(order.getTotalPrice());
        orderRequestDTO.setUser(user.getId());
        orderDao.save(order);
        orderRequestDTO.setId(order.getId());
        return orderRequestDTO;
    }

    private double calculateTotal(OrderRequestDTO orderRequestDTO){
        double total = 0;
        for (OrderItemDTO item: orderRequestDTO.getOrderItems()) {
            total += calculatePrice(item.getProduct(), item.getQuantity());
        }
        total += orderRequestDTO.getShippingPrice();
        total += orderRequestDTO.getTaxPrice();
        return total;
    }


    private double calculatePrice(Long productId, int quantity){
        if (quantity < 1) throw new CustomException("quantity has to be at least 1", HttpStatus.BAD_REQUEST);
        Product product = productService.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        if (product.getCountInStock() < quantity) throw new CustomException("Some of the products no longer have enough stock", HttpStatus.BAD_REQUEST);
        return product.getPrice() * quantity;
    }

}
