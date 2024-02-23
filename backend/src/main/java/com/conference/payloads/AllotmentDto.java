package com.conference.payloads;

import com.conference.entities.Authors_work;
import com.conference.entities.Reviewer;

import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AllotmentDto {
    private int allotment_id;

    private ReviewerDto reviewer;

    private AuthorsWorkDto authors_work;

}
