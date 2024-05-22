package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.demo.entity.Posts;

@RepositoryRestResource(collectionResourceRel = "posts", path = "posts")
public interface PostsRepository extends JpaRepository<Posts, Long> {
    public List<Posts> findByPublished(boolean published);

    @Query("SELECT p from Posts p WHERE p.title like %?1% ")
    public List<Posts> findByTitleLike(String title);
}
