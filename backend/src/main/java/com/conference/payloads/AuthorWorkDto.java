package com.conference.payloads;

import org.springframework.web.multipart.MultipartFile;

import com.conference.entities.Authors;
import com.conference.entities.Conference;
import com.conference.entities.Users;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class AuthorWorkDto {
    private int author_id;
    private String name;
    private String address;
    private String city;
    private String state;
    private String country;
    private String cont_no;
    private String email;
    private String title;
    private String track;
    private String key_words;
    private String abstractText;
    private String pdf_name;
    // private Conference conferences;

    // private int status;
    // private ConferenceDto conference;
    // private AuthorDto author;

}
