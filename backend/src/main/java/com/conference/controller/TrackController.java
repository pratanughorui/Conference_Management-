package com.conference.controller;

import java.util.List;
import java.util.Map;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.conference.entities.Conference;
import com.conference.exceptions.ResourceNotFoundException;
import com.conference.payloads.TrackDto;
import com.conference.services.ConferenceService;
import com.conference.services.TrackService;

@RestController
@RequestMapping("/track")
public class TrackController {
    @Autowired
    private ConferenceService conferenceService;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private TrackService trackService;

    @PostMapping("/createtrack")
    public ResponseEntity<String> CreateTrack(@RequestBody Map<String, Object> data) {
        String conferenceName = (String) data.get("conferenceName");
        List<String> tracks = (List<String>) data.get("tracks");
        boolean ans = this.trackService.saveTrack(tracks, conferenceName);
        if (ans == false) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Conference not found");
        }
        return ResponseEntity.ok("Tracks saved successfully");

    }

}
