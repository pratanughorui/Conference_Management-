package com.conference.payloads;

import org.springframework.web.multipart.MultipartFile;

import com.conference.entities.Authors;
import com.conference.entities.Conference;
import com.conference.entities.Users;

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
    private int work_id;
    @NotEmpty
    private String conference_name;
    @NotEmpty
    private String name;
    private String address;
    @NotEmpty
    private String city;
    @NotEmpty
    private String state;
    @NotEmpty
    private String cont_no;
    @NotEmpty
    private String email;
    @NotEmpty
    private String track;
    @NotEmpty
    private String key_words;
    @NotEmpty
    private String abstractText;
    // @NotEmpty
    // private MultipartFile pdfFile;
    @NotEmpty
    private String pdf_name;

    // private int status;
    // private ConferenceDto conference;
    // private AuthorDto author;

}
