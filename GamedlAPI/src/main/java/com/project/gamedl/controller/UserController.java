package com.project.gamedl.controller;

import com.project.gamedl.domain.User;
import com.project.gamedl.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

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
        User existingUser = userService.findUserByUsername(user.getUsername());
        if (existingUser == null) {
            return ResponseEntity.badRequest().body("Invalid username or password!");
        }

        boolean passwordMatch = passwordEncoder.matches(user.getPassword(), existingUser.getPassword());
        if (!passwordMatch) {
            logger.info("Password mismatch for user: {}", user.getUsername());
            return ResponseEntity.badRequest().body("Invalid username or password!");
        }

        logger.info("Login successful for user: {}", user.getUsername());
        return ResponseEntity.ok("Login successful!");
    }
}
