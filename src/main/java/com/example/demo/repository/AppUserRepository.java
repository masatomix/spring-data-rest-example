package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.demo.entity.AppUser;
// import com.example.demo.projection.AppUserProjection;

@RepositoryRestResource(collectionResourceRel = "user", path = "users",  /*excerptProjection = AppUserProjection.class,*/ exported = true)
public interface AppUserRepository extends JpaRepository<AppUser, String> {

    // join fetchするRepository
    @Query(value = "select user from AppUser user left join fetch user.company")
    List<AppUser> findAllUsersWithCompaCompany();

}
