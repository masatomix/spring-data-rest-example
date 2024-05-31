package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.demo.entity.Company;

@RepositoryRestResource(collectionResourceRel = "company", path = "companies", /* excerptProjection = UserProjection.class,*/ exported = true)
public interface CompanyRepository extends JpaRepository<Company, String> {
    // @Override
    // @RestResource(exported = false)
    // <S extends Users> S save(S entity);

    // @Override
    // @RestResource(exported = false)
    // void deleteById(Long id);s
}
