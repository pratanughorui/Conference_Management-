package com.conference.controller;

import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.conference.entities.Users;
import com.conference.payloads.AuthorWorkDto;
import com.conference.payloads.ConferenceDto;
import com.conference.payloads.UserDto;
import com.conference.services.ConferenceService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/conference")
public class ConferenceController {
    @Autowired
    private ConferenceService conferenceService;

    @PostMapping("/createConference")
    public ResponseEntity<ConferenceDto> createConference(@RequestBody ConferenceDto conferenceDto) {
        try {
            ConferenceDto createConferenceDto = this.conferenceService.createConference(conferenceDto);
            return new ResponseEntity<ConferenceDto>(createConferenceDto, HttpStatus.CREATED);
        } catch (DataIntegrityViolationException ex) {
            // TODO: handle exception
            throw new DataIntegrityViolationException("conference in already created");
        }
    }

    @PutMapping("/updateConference/{conference_id}")
    public ResponseEntity<ConferenceDto> updateConference(@Valid @RequestBody ConferenceDto conferenceDto,
            @PathVariable Integer conference_id) {
        ConferenceDto updatedConferenceDto = this.conferenceService.updateConference(conferenceDto, conference_id);
        return new ResponseEntity<>(updatedConferenceDto, HttpStatus.CREATED);
    }

    @GetMapping("/getAllConferencebtwdate")
    public ConferenceDto getAllConferencebtwdate() {
        System.out.println("ppppfff");
        ConferenceDto Conference = this.conferenceService.getAllConferenceBtwDate();

        return Conference;
    }

    @GetMapping("/getAllConference")
    public List<ConferenceDto> getAllConference() {
        List<ConferenceDto> allConference = this.conferenceService.getallConference();
        return allConference;
    }

    // @DeleteMapping("/deleteConference/{conference_id}")
    // public ResponseEntity<?> deleteConference(@PathVariable Integer
    // conference_id) {
    // this.conferenceService.deleteConference(conference_id);
    // return new ResponseEntity<>(Map.of("message", "Conference Deleted
    // Successfully"), HttpStatus.OK);
    // }

    @GetMapping("/getConference/{conference_id}")
    public ResponseEntity<ConferenceDto> getConference(@PathVariable Integer conference_id) {
        // ConferenceDto
        // conferenceDto=this.conferenceService.getConferenceById(conference_id);
        return ResponseEntity.ok(this.conferenceService.getConferenceById(conference_id));
    }

    // @GetMapping("/getallusersbyconference/{conference_id}")
    // public Set<UserDto> getallusersbyconference(@PathVariable Integer
    // conference_id) {
    // Set<UserDto> ans =
    // this.conferenceService.GetAllUsersByConference(conference_id);
    // return ans;
    // }

    // @GetMapping("/getauth/{conference_id}")
    // public Set<Author_Work> getauth(@PathVariable Integer conference_id) {
    // Set<Author_Work> ans = this.conferenceService.getauth(conference_id);
    // return ans;
    // }

}
