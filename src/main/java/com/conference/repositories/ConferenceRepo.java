package com.conference.repositories;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.conference.entities.Conference;

public interface ConferenceRepo extends JpaRepository<Conference, Integer> {
    @Query("SELECT c FROM Conference c WHERE c.conferences_name = :conferenceName")
    Conference findByConference_name(@Param("conferenceName") String conference_name);

    @Query("SELECT c FROM Conference c WHERE c.conferences_name = :conferenceName")
    Set<Conference> findByAllConference_name(@Param("conferenceName") String conference_name);
}
