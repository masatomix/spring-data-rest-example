package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.demo.entity.AppUser;
// import com.example.demo.projection.ExcerptAppUser;

@RepositoryRestResource(collectionResourceRel = "user", path = "users",  /*excerptProjection = ExcerptAppUser.class, */exported = true)
public interface AppUserRepository extends JpaRepository<AppUser, String> {
    // @Override
    // @RestResource(exported = false)
    // <S extends AppUser> S save(S entity);

    // @Override
    // @RestResource(exported = false)
    // void deleteById(Long id);
    @Query(value = "select user from AppUser user left join fetch user.company")
    List<AppUser> findAllUsersWithCompaCompany();

}
