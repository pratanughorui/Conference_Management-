package com.conference.services;

import java.util.List;

import com.conference.entities.Conference;
import com.conference.payloads.TrackDto;

public interface TrackService {
    Boolean saveTrack(List<String> trackNames, String conference_name);
}
