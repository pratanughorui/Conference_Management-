package com.conference.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.conference.payloads.UserDto;
import com.conference.services.UserService;

@RestController
@RequestMapping("/Reviewer")
public class ReviewersController {
    @Autowired
    private UserService userService;

    @PostMapping("/createreviewer/{conference_id}")
    public ResponseEntity<?> reviewerCreation(@RequestBody List<UserDto> UserDto, @PathVariable Integer conference_id) {
        this.userService.createReviewer(UserDto, conference_id);
        return new ResponseEntity<>("done", HttpStatus.CREATED);
    }

    @GetMapping("/getallreviwers/{conference_id}")
    public List<UserDto> getallreviewers(@PathVariable Integer conference_id) {
        List<UserDto> reviewer = this.userService.getallreviewers(conference_id);
        return reviewer;
    }

}
