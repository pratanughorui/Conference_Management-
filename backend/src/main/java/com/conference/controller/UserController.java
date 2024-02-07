package com.conference.controller;

import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.conference.entities.Author_Work;
import com.conference.entities.Users;
import com.conference.payloads.ApiResponse;
import com.conference.payloads.UserDto;
import com.conference.services.UserService;

import jakarta.validation.Valid;
import lombok.val;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    // @PostMapping("/createuser")
    // public ResponseEntity<?> CreateUser(@Valid @RequestBody UserDto userDto) {
    // UserDto createduser = this.userService.createUser(userDto);
    // if (createduser == null) {
    // return new ResponseEntity<>(Map.of("message", "Conference Not available"),
    // HttpStatus.BAD_REQUEST);
    // }
    // return new ResponseEntity<UserDto>(createduser, HttpStatus.CREATED);
    // }

    // @GetMapping("/getallusers")
    // public List<UserDto> getAllUsers() {
    // List<UserDto> userDto = this.userService.getAllUser();
    // return userDto;

    // }

    // @GetMapping("/getallusersbyrole/{role_id}")
    // public List<UserDto> getAllUserByRole(@PathVariable Integer role_id) {
    // List<UserDto> userDto = this.userService.getAllUserByRole(role_id);
    // return userDto;
    // }

    @PutMapping("/updateuserbyid/{user_id}")
    public ResponseEntity<UserDto> updateUserById(@Valid @RequestBody UserDto userDto, @PathVariable Integer user_id) {
        UserDto updatedUserDto = this.userService.updateUser(userDto, user_id);
        return new ResponseEntity<UserDto>(updatedUserDto, HttpStatus.CREATED);
    }

    // @GetMapping("/getalluserbyconference/{conference_id}")
    // public List<UserDto> getAllUserByConference(@PathVariable Integer
    // conference_id) {
    // List<UserDto> userDto =
    // this.userService.getAllUserByConference(conference_id);
    // return userDto;
    // }

    @DeleteMapping("/deleteuser/{user_id}")
    public ResponseEntity<?> deleteUser(@PathVariable Integer user_id) {
        this.userService.deleteUserById(user_id);
        return new ResponseEntity<>(Map.of("message", "User Deleted Successfully"), HttpStatus.OK);
    }

}