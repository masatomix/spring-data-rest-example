package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import com.example.demo.entity.Users;
import com.example.demo.projection.UserProjection;

@RepositoryRestResource(collectionResourceRel = "users", path = "users", excerptProjection = UserProjection.class, exported = true)
public interface UsersRepository extends JpaRepository<Users, Long> {
    @Override
    @RestResource(exported = false)
    <S extends Users> S save(S entity);

    @Override
    @RestResource(exported = false)
    void deleteById(Long id);
}
