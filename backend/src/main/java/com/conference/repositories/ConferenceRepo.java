package com.conference.repositories;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.conference.entities.Conference;

public interface ConferenceRepo extends JpaRepository<Conference, Integer> {
    @Query("SELECT c FROM Conference c WHERE c.conferences_title = :conferenceTitle")
    Conference findByConference_title(@Param("conferenceTitle") String conference_Title);

    @Query("SELECT c FROM Conference c WHERE c.conferences_title = :conferenceTitle")
    Set<Conference> findByAllConference_Title(@Param("conferenceTitle") String conference_Title);

    @Query("SELECT c FROM Conference c WHERE :currentDate BETWEEN c.creationDateTime and c.toDate")
    List<Conference> findAllConferencesBtwDate(LocalDateTime currentDate);
}
