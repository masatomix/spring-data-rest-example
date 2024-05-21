package com.example.demo.projection;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import com.example.demo.entity.Posts;
import com.example.demo.entity.Users;

@Projection(name = "without-password", types = { Users.class })
public interface UserProjection {
    @Value("#{target.firstName} #{target.lastName}")
    public String getFullName();

    public List<Posts> getPosts();
}
