package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.demo.entity.Users;

@RepositoryRestResource(collectionResourceRel = "users", path = "users")
public interface UsersRepository extends JpaRepository<Users, Long> {

}
