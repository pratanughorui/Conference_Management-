package com.conference.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "allotments")
@Getter
@Setter
@NoArgsConstructor
public class Allotments {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int allotment_id;

    @ManyToOne
    private Reviewer reviewers;

    @ManyToOne
    private Authors_work authors_work;

    @ManyToOne
    private Conference conference;

}
