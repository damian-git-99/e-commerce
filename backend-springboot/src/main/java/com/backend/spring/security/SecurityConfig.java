package com.backend.spring.security;

import com.backend.spring.modules.usercontext.user.daos.UserDao;
import com.backend.spring.security.filter.JWTAuthenticationFilter;
import com.backend.spring.security.jwt.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private UserDetailsService userDetailsService;
    private UserDao userDao;
    private PasswordEncoder passwordEncoder;
    private JWTService jwtService;

    @Autowired
    public SecurityConfig(UserDetailsService userDetailsService, UserDao userDao, PasswordEncoder passwordEncoder, JWTService jwtService) {
        this.userDetailsService = userDetailsService;
        this.userDao = userDao;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.authorizeRequests().antMatchers("/**").permitAll();
        http.addFilter(new JWTAuthenticationFilter(this.authenticationManager(), userDao, jwtService));
    }


}
