package com.project.gamedl.controller;

import com.project.gamedl.domain.User;
import com.project.gamedl.service.UserService;
import com.project.gamedl.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public UserController(UserService userService, PasswordEncoder passwordEncoder, JwtUtil jwtUtil, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
    }

    @GetMapping("/protected")
    public ResponseEntity<?> getProtectedResource() {
        return ResponseEntity.ok("This is a protected resource. You are authenticated!");
    }


    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        User existingUser = userService.findUserByUsername(user.getUsername());
        if (existingUser != null) {
            return ResponseEntity.badRequest().body("Username is already taken!");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userService.registerUser(user);
        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
            );
            String token = jwtUtil.generateToken(user.getUsername());
            return ResponseEntity.ok(new JwtResponse(token));
        } catch (AuthenticationException e) {
            logger.error("Login failed for user: {}", user.getUsername(), e);
            return ResponseEntity.badRequest().body("Invalid username or password!");
        }
    }

    public static class JwtResponse {
        private final String token;

        public JwtResponse(String token) {
            this.token = token;
        }

        public String getToken() {
            return token;
        }
    }
}
