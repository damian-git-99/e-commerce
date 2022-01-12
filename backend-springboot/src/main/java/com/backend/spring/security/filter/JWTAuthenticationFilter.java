package com.backend.spring.security.filter;

import com.backend.spring.modules.user.user.daos.UserDao;
import com.backend.spring.modules.user.user.entities.User;
import com.backend.spring.security.jwt.JWTService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private AuthenticationManager authenticationManager;
    private UserDao userDao;
    private JWTService jwtService;

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager, UserDao userDao, JWTService jwtService) {
        this.authenticationManager = authenticationManager;
        this.userDao = userDao;
        this.jwtService = jwtService;
        setRequiresAuthenticationRequestMatcher(new AntPathRequestMatcher("/api/users/login", "POST"));
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        setUsernameParameter("email");
        String email = obtainUsername(request);
        email = (email != null) ? email : "";
        email = email.trim();

        String password = obtainPassword(request);
        password = (password != null) ? password : "";
        password = password.trim();

        if (email.isEmpty() && password.isEmpty()) {
            User user;
            // capturing raw json data
            try {
                user = new ObjectMapper().readValue(request.getInputStream(), User.class);
                email = user.getEmail();
                password = user.getPassword();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(email, password);
        return authenticationManager.authenticate(token);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException, ServletException {
        Map<String, Object> payload = new HashMap<>();
        User user = this.userDao.findUserByEmail(authentication.getName()).orElseThrow(() -> new RuntimeException("something goes wrong"));

        payload.put("id", user.getId());
        String token = jwtService.createAccessToken(authentication.getName(), payload);

        response.setHeader("Authorization", "Bearer ".concat(token));

        Map<String, Object> body = new HashMap<>();
        body.put("token", token);
        body.put("name", user.getName());
        body.put("id", user.getId());
        body.put("email", user.getEmail());
        body.put("isAdmin", user.isAdmin());

        response.setContentType("application/json");
        response.getWriter().write(new ObjectMapper().writeValueAsString(body));
        response.setStatus(HttpServletResponse.SC_OK);
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        Map<String, Object> body = new HashMap<>();

        body.put("message", "Bad credentials");

        response.getWriter().write(new ObjectMapper().writeValueAsString(body));
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
    }

}
