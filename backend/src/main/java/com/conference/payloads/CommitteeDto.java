package com.conference.payloads;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CommitteeDto {
    private int committee_id;
    private String committee_name;
}
