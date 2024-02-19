package com.conference.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Reviewer")
@Getter
@Setter
@NoArgsConstructor
public class Reviewer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reviewer_id;
    private String name;
    private String address;
    private String place;
    private String state;
    private String country;
    private String password;
    private String mobile;
    @Column(unique = true)
    private String email;
    @ManyToMany
    @JoinTable(name = "conference_reviewer", joinColumns = @JoinColumn(name = "reviewer_id"), inverseJoinColumns = @JoinColumn(name = "conference_id"))
    private List<Conference> conferences = new ArrayList<>();
}