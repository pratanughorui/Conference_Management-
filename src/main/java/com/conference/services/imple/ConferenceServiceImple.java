package com.conference.services.imple;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.conference.entities.Author_Work;
import com.conference.entities.Conference;
import com.conference.entities.ConferenceUser;
import com.conference.entities.Users;
import com.conference.payloads.AuthorWorkDto;
import com.conference.payloads.ConferenceDto;
import com.conference.payloads.UserDto;
import com.conference.repositories.ConferenceRepo;
import com.conference.repositories.Conference_UserRepo;
import com.conference.services.ConferenceService;
import com.conference.exceptions.ResourceNotFoundException;

@Service
public class ConferenceServiceImple implements ConferenceService {
    @Autowired
    private ConferenceRepo conferenceRepo;
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private Conference_UserRepo conference_UserRepo;

    @Override
    public ConferenceDto createConference(ConferenceDto conferenceDto) {
        // System.out.println("pratanu");
        Conference conference = this.dtoToentity(conferenceDto);
        Conference savedconference = this.conferenceRepo.save(conference);
        return this.entityTodto(savedconference);
    }

    public ConferenceDto entityTodto(Conference conference) {
        ConferenceDto conferenceDto = new ConferenceDto();
        conferenceDto.setClose_date(conference.getClose_date());
        conferenceDto.setConference_id(conference.getConference_id());
        conferenceDto.setConferences_name(conference.getConferences_name());
        conferenceDto.setOrganization_name(conference.getOrganization_name());
        conferenceDto.setStart_date(conference.getStart_date());
        conferenceDto.setSubject(conference.getSubject());
        conferenceDto.setTrack(conference.getTrack());
        conferenceDto.setVenue(conference.getVenue());
        // conferenceDto.setAuthor_Works(null);
        // conferenceDto.setUser(null);
        return conferenceDto;

    }

    public Conference dtoToentity(ConferenceDto conferenceDto) {
        Conference conference = new Conference();
        conference.setClose_date(conferenceDto.getClose_date());
        conference.setConference_id(conferenceDto.getConference_id());
        conference.setConferences_name(conferenceDto.getConferences_name());
        conference.setOrganization_name(conferenceDto.getOrganization_name());
        conference.setStart_date(conferenceDto.getStart_date());
        conference.setSubject(conferenceDto.getSubject());
        conference.setTrack(conferenceDto.getTrack());
        conference.setVenue(conferenceDto.getVenue());
        // conference.setAuthor_Works(null);
        conference.setUser(null);
        return conference;
    }

    @Override
    public ConferenceDto updateConference(ConferenceDto conferenceDto, Integer conference_id) {
        Conference conference = this.conferenceRepo.findById(conference_id)
                .orElseThrow(() -> new ResourceNotFoundException("Conference", "id", conference_id));
        conference.setConferences_name(conferenceDto.getConferences_name());
        conference.setClose_date(conferenceDto.getClose_date());
        conference.setOrganization_name(conferenceDto.getOrganization_name());
        conference.setStart_date(conferenceDto.getStart_date());
        conference.setSubject(conferenceDto.getSubject());
        conference.setTrack(conferenceDto.getTrack());
        conference.setVenue(conferenceDto.getVenue());
        Conference updatedconference = this.conferenceRepo.save(conference);
        return this.modelMapper.map(updatedconference, ConferenceDto.class);
    }

    @Override
    public void deleteConference(Integer conference_id) {
        // this.conferenceRepo.findById(conference_id)
        // .orElseThrow(() -> new ResourceNotFoundException("Conference", "id",
        // conference_id));
        // delete conference_user row
        Set<ConferenceUser> conferenceUser = this.conference_UserRepo.findByAllConference_id(conference_id);
        if (conferenceUser != null) {
            System.out.println("dfdf");
            this.conference_UserRepo.deleteByAllConference_id(conference_id);
        }

        this.conferenceRepo.deleteById(conference_id);

    }

    @Override
    public List<ConferenceDto> getallConference() {
        List<Conference> conference = this.conferenceRepo.findAll();
        List<ConferenceDto> conferenceDto = conference.stream()
                .map(con -> this.modelMapper.map(con, ConferenceDto.class))
                .collect(Collectors.toList());
        return conferenceDto;
    }

    // @Override
    // public Set<UserDto> GetAllUsersByConference(Integer conference_id) {
    // Conference conference = this.conferenceRepo.findById(conference_id)
    // .orElseThrow(() -> new ResourceNotFoundException("Conference", "id",
    // conference_id));
    // Set<Users> user = conference.getAttendees();
    // Set<UserDto> userDto = user.stream().map(con -> new
    // UserServiceImple().userTodto(con))
    // .collect(Collectors.toSet());
    // return userDto;

    // }

    // public ConferenceDto entityTodto(Conference conference) {
    // ConferenceDto conferenceDto = new ConferenceDto();
    // conferenceDto.setClose_date(conference.getClose_date());
    // conferenceDto.setConference_id(conference.getConference_id());
    // conferenceDto.setConferences_name(conference.getConferences_name());
    // conferenceDto.setOrganization_name(conference.getOrganization_name());
    // conferenceDto.setStart_date(conference.getStart_date());
    // conferenceDto.setSubject(conference.getSubject());
    // conferenceDto.setTrack(conference.getTrack());
    // conferenceDto.setVenue(conference.getVenue());
    // for (Author_Work author_Work : conference.getauthor_Works()) {
    // AuthorWorkDto authorWorkDto = this.modelMapper.map(author_Work,
    // AuthorWorkDto.class);
    // conferenceDto.setauthor_Works(authorWorkDto);
    // }
    // // conferenceDto.setauthor_Works(conference.getauthor_Works());
    // // conferenceDto.setuser(conference.getuser());
    // return conferenceDto;
    // }

    @Override
    public ConferenceDto getConferenceById(Integer conference_id) {
        Conference conference = this.conferenceRepo.findById(conference_id)
                .orElseThrow(() -> new ResourceNotFoundException("Conference", "id", conference_id));
        return this.modelMapper.map(conference, ConferenceDto.class);

    }

    // @Override
    // public Set<Author_Work> getauth(Integer conference_id) {
    // Conference conference = this.conferenceRepo.findById(conference_id)
    // .orElseThrow(() -> new ResourceNotFoundException("Conference", "id",
    // conference_id));

    // Set<Author_Work> ans = conference.getauthor_Works();
    // return ans;
    // }

}
