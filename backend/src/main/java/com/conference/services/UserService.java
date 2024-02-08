package com.conference.services;

import com.conference.payloads.UserDto;

import java.util.List;
import java.util.Set;

public interface UserService {
    public UserDto createUser(UserDto userDto, Integer conference_id, Integer role_id);

    public UserDto updateUser(UserDto userDto, Integer user_id);

    public void deleteUserById(Integer user_id);

    // public List<UserDto> getAllUser();

    public UserDto getUserById(Integer user_id);

    // public List<UserDto> getAllUserByRole(Integer role_id);
    // public UserDto RegisterNewUser(UserDto userDto);

    // public List<UserDto> getAllUserByConference(Integer conference_id);
}
