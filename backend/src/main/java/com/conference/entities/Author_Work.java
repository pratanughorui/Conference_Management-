package com.conference.entities;

import jakarta.annotation.Generated;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "author_work")
@NoArgsConstructor
@Getter
@Setter
public class Author_Work {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int author_id;
    private String conference_name;

    private String name;
    private String address;

    private String city;

    private String state;

    private String cont_no;

    private String email;

    private String track;

    private String key_words;

    private String abstractText;
    //
    // private MultipartFile pdfFile;

    private String pdf_name;
    // @ManyToOne
    // @JoinColumn(name = "conference_id", referencedColumnName = "conference_id")
    // private Conference conference;
    // @ManyToOne
    // @JoinColumn(name = "conference_id")
    // private Conference conference;

    // @ManyToOne
    // @JoinColumn(name = "author_id", referencedColumnName = "author_id")
    // private Authors author;
    // @ManyToOne
    // @JoinColumn(name = "author_id")
    // private Authors author;
    // @OneToOne
    // @JoinColumn(name = "author_id", unique = true)
    // private Authors author;

}
