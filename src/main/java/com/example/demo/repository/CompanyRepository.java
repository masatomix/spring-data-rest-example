package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.demo.entity.Company;

@RepositoryRestResource(collectionResourceRel = "company", path = "companies", exported = true)
public interface CompanyRepository extends JpaRepository<Company, String> {
}
