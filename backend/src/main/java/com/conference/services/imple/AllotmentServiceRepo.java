package com.conference.services.imple;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.conference.entities.Allotments;
import com.conference.entities.Authors_work;
import com.conference.entities.Conference;
import com.conference.entities.Reviewer;
import com.conference.exceptions.ResourceNotFoundException;
import com.conference.payloads.AllotmentDto;
import com.conference.payloads.AuthorWorkDto;
import com.conference.payloads.AuthorsWorkDto;
import com.conference.payloads.ReviewerDto;
import com.conference.repositories.AllotmentsRepo;
import com.conference.repositories.ConferenceRepo;
import com.conference.repositories.ReviewerRepo;
import com.conference.services.AllotmentsService;

@Service
public class AllotmentServiceRepo implements AllotmentsService {
    @Autowired
    private AllotmentsRepo allotmentsRepo;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private ReviewerRepo reviewerRepo;

    @Autowired
    private ConferenceRepo conferenceRepo;

    @Override
    public void createallot(List<AllotmentDto> allotmentDtos, Integer conference_id) {
        Conference conference = this.conferenceRepo.findById(conference_id)
                .orElseThrow(() -> new ResourceNotFoundException("Cpmference", "id", conference_id));
        for (AllotmentDto dto : allotmentDtos) {
            ReviewerDto reviewerDto = dto.getReviewer();
            AuthorsWorkDto authorWorkDto = dto.getAuthors_work();
            Allotments allotments = new Allotments();
            allotments.setReviewers(this.modelMapper.map(reviewerDto, Reviewer.class));
            allotments.setAuthors_work(this.modelMapper.map(authorWorkDto, Authors_work.class));
            allotments.setConference(conference);
            allotmentsRepo.save(allotments);
        }
    }

    @Override
    public List<AllotmentDto> getpapers(Integer reviewer_id) {
        Reviewer reviewer = this.reviewerRepo.findById(reviewer_id)
                .orElseThrow(() -> new ResourceNotFoundException("Cpmference", "id", reviewer_id));
        List<Allotments> authors_works = reviewer.getAllotments();
        List<AllotmentDto> allotmentDtos = authors_works.stream()
                .map(con -> this.modelMapper.map(con, AllotmentDto.class)).collect(Collectors.toList());
        return allotmentDtos;
    }

}
