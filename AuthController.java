package com.example.home_expense_backend.controller;

import com.example.home_expense_backend.model.user;
import com.example.home_expense_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody user login) {
        user user = userRepository.findByUsername(login.getUsername());
        if (user != null && user.getPassword().equals(login.getPassword())) {
            user.setPassword(null);
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody user u) {
        if (userRepository.findByUsername(u.getUsername()) != null) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        userRepository.save(u);
        u.setPassword(null);
        return ResponseEntity.ok(u);
    }
}
