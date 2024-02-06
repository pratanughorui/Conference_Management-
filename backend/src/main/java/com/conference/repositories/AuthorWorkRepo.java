package com.conference.repositories;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.conference.entities.Author_Work;

public interface AuthorWorkRepo extends JpaRepository<Author_Work, Integer> {

}
