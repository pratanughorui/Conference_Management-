package com.conference.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.conference.entities.Authors;

public interface AuthorRepo extends JpaRepository<Authors, Integer> {
    @Query("SELECT c FROM Authors c WHERE c.email = :email")
    Authors getByEmial(@Param("email") String email);
}
