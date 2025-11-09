package com.example.home_expense_backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "Expense")
public class Expense {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private Double amount;
    private String category;
    private LocalDate expenseDate;
    private String description;

    public Expense(){}

   
    public Long getId(){return id;}
    public void setId(Long id){this.id = id;}

    public Long getUserId(){return userId;}
    public void setUserId(Long userId){this.userId = userId;}

    public Double getAmount(){return amount;}
    public void setAmount(Double amount){this.amount = amount;}

    public String getCategory(){return category;}
    public void setCategory(String category){this.category = category;}

    public LocalDate getExpenseDate(){return expenseDate;}
    public void setExpenseDate(LocalDate expenseDate){this.expenseDate = expenseDate;}

    public String getDescription(){return description;}
    public void setDescription(String description){this.description = description;}
}

