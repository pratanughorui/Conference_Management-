package com.conference.payloads;

import com.conference.entities.Authors;
import com.conference.entities.Conference;
import com.conference.entities.Users;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class AuthorWorkDto {
    private int work_id;
    @NotEmpty
    private String track;
    @NotEmpty
    private String key_words;
    @NotEmpty
    private String pdf_name;
    @NotEmpty
    private String abstractText;
    private int status;
    // private ConferenceDto conference;
    // private AuthorDto author;

}
