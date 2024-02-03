package com.conference.services.imple;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.conference.entities.Conference;
import com.conference.entities.Track;
import com.conference.exceptions.ResourceNotFoundException;
import com.conference.payloads.TrackDto;
import com.conference.repositories.ConferenceRepo;
import com.conference.repositories.TrackRepo;
import com.conference.services.TrackService;

@Service
public class TrackServiceImple implements TrackService {
    @Autowired
    private TrackRepo trackRepo;
    @Autowired
    private ConferenceRepo conferenceRepo;

    @Override
    public Boolean saveTrack(List<String> trackNames, String conference_name) {
        Conference conference = this.conferenceRepo.findByConference_name(conference_name);
        if (conference == null) {
            return false;
        }
        for (String trackName : trackNames) {
            Track track = new Track();
            track.setTrack_name(trackName);
            track.setConference(conference);
            trackRepo.save(track);
        }
        return true;

    }
}
