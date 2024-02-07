package com.conference.payloads;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import com.conference.entities.Author_Work;
import com.conference.entities.Users;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class ConferenceDto {
    private int conference_id;

    @NotEmpty
    private String conferences_title;

    @NotEmpty
    private String subject;
    @NotEmpty
    private String place;
    @NotEmpty
    private String country;

    @NotEmpty
    private String venue;

    @NotEmpty
    private String fromDate;

    @NotEmpty
    private String toDate;

    private LocalDateTime creationDateTime;

    // private Set<AuthorWorkDto> author_Works;
    // private Set<UserDto> user;

    // public void setauthor_Works(AuthorWorkDto author_Work) {
    // this.author_Works.add(author_Work);
    // }

    // public void setuser(UserDto user) {
    // this.user.add(user);
    // }

    // public Set<AuthorWorkDto> getauthor_Works() {
    // return author_Works;
    // }

    // public Set<UserDto> getuser() {
    // return user;
    // }
}
