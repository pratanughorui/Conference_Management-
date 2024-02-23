package com.conference.services;

import java.util.List;

import com.conference.payloads.AllotmentDto;
import com.conference.payloads.AuthorWorkDto;
import com.conference.payloads.ReviewerDto;

public interface AllotmentsService {
    void createallot(List<AllotmentDto> allotmentDtos, Integer conference_id);

    List<AllotmentDto> getpapers(Integer reviewer_id);
}
