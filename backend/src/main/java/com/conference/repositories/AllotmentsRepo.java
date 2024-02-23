package com.conference.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.conference.entities.Allotments;

public interface AllotmentsRepo extends JpaRepository<Allotments, Integer> {

}
