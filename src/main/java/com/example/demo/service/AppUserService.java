// src/main/java/com/example/demo/service/UserService.java
package com.example.demo.service;

import com.example.demo.entity.AppUser;
import com.example.demo.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppUserService {
    @Autowired
    private AppUserRepository appUserRepository;

    public List<AppUser> getAllUsers() {
        return appUserRepository.findAll();
    }

    public  AppUser findAppUserById(String userId) {
        return appUserRepository.findById(userId).orElseThrow(()-> new RuntimeException(userId+"は存在しません"));
    }

    public AppUser saveUser(AppUser user) {
        return appUserRepository.save(user);
    }
}