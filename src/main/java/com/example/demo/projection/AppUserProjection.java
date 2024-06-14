package com.example.demo.projection;


import org.springframework.data.rest.core.config.Projection;

import com.example.demo.entity.AppUser;
import com.example.demo.entity.Company;


@Projection(name = "AppUserProjection", types = { AppUser.class }) 
public interface AppUserProjection { 

    public String getUserId();
    public String getFirstName();
    public String getLastName();
    public String getEmail();
    public int getAge();
    public Company getCompany();

}
