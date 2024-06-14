package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.demo.entity.Company;

@RepositoryRestResource(collectionResourceRel = "company", path = "companies", /* excerptProjection = UserProjection.class,*/ exported = true)
public interface CompanyRepository extends JpaRepository<Company, String> {
    @Query(value = "select company from Company company where company.companyCode in :ids")
    List<Company> findAllByIdIn(@Param("ids") List<String> companyCodes);

}
