package com.backend.spring.security.jwt;

import io.jsonwebtoken.Claims;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.Map;

public interface JWTService {

    public String createAccessToken(String username, Map<String, Object> payload);

    public boolean validateToken(String header);

    public Claims getClaims(String header);

    public Collection<? extends GrantedAuthority> getRoles(Long userId);

}
