package com.conference.services.imple;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.conference.entities.Conference;
import com.conference.entities.Reviewer;
import com.conference.entities.Users;
import com.conference.exceptions.ResourceNotFoundException;
import com.conference.payloads.ConferenceDto;
import com.conference.payloads.ReviewerDto;
import com.conference.payloads.UserDto;
import com.conference.repositories.ConferenceRepo;
import com.conference.repositories.ReviewerRepo;
import com.conference.services.ReviewerService;

@Service
public class ReviewerServiceImple implements ReviewerService {

    @Autowired
    private ReviewerRepo reviewerRepo;
    @Autowired
    private ConferenceRepo conferenceRepo;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public boolean createReviewer(List<ReviewerDto> reviewerDto, Integer conference_id) {
        Conference conference = this.conferenceRepo.findById(conference_id)
                .orElseThrow(() -> new ResourceNotFoundException("Conference", "id",
                        conference_id));
        for (ReviewerDto reviewer : reviewerDto) {
            String email = reviewer.getEmail();
            Reviewer existreviewer = this.reviewerRepo.findByEmail(email);
            if (existreviewer == null) {
                Reviewer newuser = this.modelMapper.map(reviewer, Reviewer.class);
                newuser.getConferences().add(conference);
                this.reviewerRepo.save(newuser);
            } else {
                if (conference.getReviewers().contains(existreviewer)) {
                    throw new DataIntegrityViolationException("This user is already exist");
                } else {
                    existreviewer.getConferences().add(conference);
                    this.reviewerRepo.save(existreviewer);
                }
            }
        }
        return true;
    }

    @Override
    public List<ReviewerDto> getallreviewers(Integer conference_id) {
        Conference conference = this.conferenceRepo.findById(conference_id)
                .orElseThrow(() -> new ResourceNotFoundException("Conference", "id",
                        conference_id));
        List<Reviewer> reviewers = conference.getReviewers();
        List<ReviewerDto> reviewerDtos = reviewers.stream()
                .map(con -> this.modelMapper.map(con, ReviewerDto.class))
                .collect(Collectors.toList());
        return reviewerDtos;
    }

    @Override
    public List<ReviewerDto> getallReviewersbeforerecentdate() {
        // TODO Auto-generated method stub
        LocalDateTime currentDate = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String now = currentDate.format(formatter);
        List<Conference> conferences = this.conferenceRepo.findAllConferencesBeforeDate(now);
        List<Reviewer> reviewers = new ArrayList<>();
        for (Conference c : conferences) {
            reviewers.addAll(c.getReviewers());
        }
        List<ReviewerDto> reviewerDtos = reviewers.stream().map(con -> this.modelMapper.map(con, ReviewerDto.class))
                .collect(Collectors.toList());
        return reviewerDtos;
    }
    /*
     * @Override
     * public List<UserDto> getAllUserBeforeRecentDate() {
     * LocalDateTime currentDate = LocalDateTime.now();
     * DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
     * String now = currentDate.format(formatter);
     * List<Conference> conferences =
     * this.conferenceRepo.findAllConferencesBeforeDate(now);
     * List<Users> users = new ArrayList<>();
     * for (Conference c : conferences) {
     * users.addAll(c.getUser());
     * }
     * List<UserDto> users2 = users.stream().map(con -> this.modelMapper.map(con,
     * UserDto.class))
     * .collect(Collectors.toList());
     * return users2;
     * 
     * }
     */

}
