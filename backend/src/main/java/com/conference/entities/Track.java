package com.conference.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Tracks")
@Getter
@Setter
@NoArgsConstructor
public class Track {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int track_id;
    private String track_name;
    @ManyToOne
    @JoinColumn(name = "conference_id")
    private Conference conference;

    @OneToMany(mappedBy = "track")
    private List<Topics> topics;

    @ManyToMany(mappedBy = "tracks")
    private List<Reviewer> reviewers = new ArrayList<>();
}
