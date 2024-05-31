package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class AppUser {
    @Id
    @Column(length = 6, nullable = false)
    private String userId;

    @Column(length = 100, nullable = true)
    private String firstName;

    @Column(length = 100, nullable = true)
    private String lastName;

    @ManyToOne
    @JoinColumn(name = "COMPANY_CODE", nullable = false)
    private Company company;
}
