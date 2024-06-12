package com.example.demo.entity;

// import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
// @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Company {
    @Id
    private String companyCode;

    private String companyName;
}
