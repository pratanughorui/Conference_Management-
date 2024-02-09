package com.conference.services;

import java.util.List;
import java.util.Set;

import com.conference.payloads.ConferenceDto;
import com.conference.payloads.UserDto;

public interface ConferenceService {
    ConferenceDto createConference(ConferenceDto conferencedDto);

    ConferenceDto updateConference(ConferenceDto conference, Integer conference_id);

    // void deleteConference(Integer conference_id);

    List<ConferenceDto> getallConference();

    ConferenceDto getConferenceById(Integer conference_id);

    List<ConferenceDto> getAllConferenceBtwDate();

    // public Set<UserDto> GetAllUsersByConference(Integer conference_id);

    // Set<Author_Work> getauth(Integer conference_id);

}
