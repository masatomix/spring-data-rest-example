package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.demo.entity.DateEntity;

@RepositoryRestResource(collectionResourceRel = "dateEntity", path = "dateEntities", exported = true)
public interface DateEntityRepository extends JpaRepository<DateEntity, String> {

}
