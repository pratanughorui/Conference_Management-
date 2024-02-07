package com.conference.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.conference.entities.Work;

public interface WorkRepo extends JpaRepository<Work, Integer> {

}
