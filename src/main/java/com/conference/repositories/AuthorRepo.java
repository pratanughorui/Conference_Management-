package com.conference.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.conference.entities.Authors;

public interface AuthorRepo extends JpaRepository<Authors, Integer> {

}
