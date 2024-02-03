package com.conference.payloads;

import java.util.HashSet;
import java.util.Set;

import com.conference.entities.Conference;
import com.conference.entities.Role;

import io.micrometer.common.lang.NonNull;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserDto {
    private int user_id;
    @NotEmpty
    private String name;

    private String address;
    @NotEmpty
    private String password;
    @NotEmpty
    private String mobile;

    private String conference_name;
    // @NotEmpty
    // private String user_type;
    @NotEmpty
    @Email(message = "email address is not valid")
    private String email;
    // private Set<Conference> conferences;
    // private Set<RoleDto> roles;
    // private RoleDto role;
    // private ConferenceDto conference;
}
