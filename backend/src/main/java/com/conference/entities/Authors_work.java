package com.conference.entities;

import jakarta.annotation.Generated;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "authors_work")
@Getter
@Setter
@NoArgsConstructor
public class Authors_work {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int author_id;
    private String name;
    private String address;
    private String city;
    private String state;
    private String country;
    private String cont_no;
    private String email;
    private String title;
    private String track;
    private String key_words;
    private String abstractText;
    private String pdf_name;
    @ManyToOne
    @JoinColumn(name = "conference_id")
    private Conference conferences;
}
