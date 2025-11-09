package com.example.home_expense_backend.repository;

import com.example.home_expense_backend.model.user;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<user, Long> {
    user findByUsername(String username);
}
