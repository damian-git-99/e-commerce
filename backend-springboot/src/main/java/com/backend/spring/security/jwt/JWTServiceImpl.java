package com.backend.spring.security.jwt;

import com.backend.spring.modules.usercontext.role.Role;
import com.backend.spring.modules.usercontext.user.daos.UserDao;
import com.backend.spring.modules.usercontext.user.entities.User;
import com.backend.spring.shared.exceptions.CustomException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Collection;
import java.util.Date;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class JWTServiceImpl implements JWTService {

    private UserDao userDao;
    private final Date TWO_HOURS = new Date(System.currentTimeMillis()  + (10 * 6000 * 120));

    public static final Key SECRET_KEY =
            Keys.hmacShaKeyFor("MI_SUPER_LLAVE_PRIVADA_QWERTY_54321".getBytes(StandardCharsets.UTF_8));

    @Autowired
    public JWTServiceImpl(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public String createAccessToken(String username, Map<String, Object> payload) {

        Claims claims = Jwts.claims();
        claims.putAll(payload);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(TWO_HOURS)
                .signWith(SECRET_KEY)
                .compact();
    }

    @Override
    public boolean validateToken(String authorizationHeader) {
        try {
            this.getClaims(authorizationHeader);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            // Token validation failed
            throw new CustomException("Expired or invalid JWT token", HttpStatus.UNAUTHORIZED);
        }
    }

    @Override
    public Claims getClaims(String header) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(this.resolveToken(header))
                .getBody();
    }

    @Override
    @Transactional
    public Collection<? extends GrantedAuthority> getRoles(Long userId) {
        User user = userDao.findById(userId).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return user.getRoles().stream()
                .map(Role::getName)
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    // remove the Bearer from the token
    private String resolveToken(String header) {
        if (header != null && header.startsWith("Bearer "))
            return header.replace("Bearer ", "");
        return null;
    }
}
