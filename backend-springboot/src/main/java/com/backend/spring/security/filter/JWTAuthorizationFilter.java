package com.backend.spring.security.filter;

import com.backend.spring.security.jwt.JWTService;
import com.backend.spring.shared.exceptions.CustomException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class JWTAuthorizationFilter extends OncePerRequestFilter {

    private JWTService jwtService;
    private AuthenticationManager authenticationManager;
    private final ObjectMapper mapper = new ObjectMapper();

    public JWTAuthorizationFilter(AuthenticationManager authenticationManager, JWTService jwtService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
        if (request.getServletPath().equals("/api/user/login")) chain.doFilter(request, response);

        String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            chain.doFilter(request, response);
            return;
        }

        UsernamePasswordAuthenticationToken token = null;

        try {
            if (jwtService.validateToken(authorizationHeader)) {
                Claims claims = jwtService.getClaims(authorizationHeader);
                Long id = claims.get("id", Long.class);
                token = new UsernamePasswordAuthenticationToken(claims.getSubject(), null, jwtService.getRoles(id));
                SecurityContextHolder.getContext().setAuthentication(token);
            }
            chain.doFilter(request, response);
        } catch (CustomException ex) {
            SecurityContextHolder.clearContext();
            Map<String, Object> errorDetails = new HashMap<>();
            errorDetails.put("message", ex.getMessage());
            response.setStatus(ex.getHttpStatus().value());
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            mapper.writeValue(response.getWriter(), errorDetails);
        }

    }


}
