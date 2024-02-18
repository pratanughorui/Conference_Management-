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

import com.conference.payloads.ReviewerDto;
import com.conference.payloads.UserDto;
import com.conference.services.ReviewerService;
import com.conference.services.UserService;

@RestController
@RequestMapping("/Reviewer")
public class ReviewersController {
    @Autowired
    private UserService userService;

    @Autowired
    private ReviewerService reviewerService;

    @PostMapping("/createreviewer/{conference_id}")
    public ResponseEntity<?> reviewerCreation(@RequestBody List<ReviewerDto> reviewerDto,
            @PathVariable Integer conference_id) {
        this.reviewerService.createReviewer(reviewerDto, conference_id);
        return new ResponseEntity<>("Reviewers created successfully!", HttpStatus.CREATED);
    }

    @GetMapping("/getallreviwers/{conference_id}")
    public List<ReviewerDto> getallreviewers(@PathVariable Integer conference_id) {
        List<ReviewerDto> reviewer = this.reviewerService.getallreviewers(conference_id);
        return reviewer;
    }

}
