package com.conference.payloads;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class TrackDto {
    private int track_id;
    private String conference_name;
    private String track_name;
}
