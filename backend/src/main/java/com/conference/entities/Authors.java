package com.conference.entities;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Authors")
@Getter
@Setter
@NoArgsConstructor
public class Authors {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int author_id;
    private String conference_name;
    private String name;
    private String address;
    private String city;
    private String state;
    private String cont_no;
    @Column(unique = true)
    private String email;
    @OneToMany(mappedBy = "authors", cascade = CascadeType.REMOVE)
    private List<Work> works;

    @ManyToMany
    @JoinTable(name = "conference_authors", joinColumns = {
            @JoinColumn(name = "author_id") }, inverseJoinColumns = {
                    @JoinColumn(name = "conference_id") })
    private Set<Conference> conferences = new HashSet<>();

    // @ManyToOne
    // @JoinColumn(name = "conference_id")
    // private Conference conference;

    // @OneToOne(mappedBy = "author", cascade = CascadeType.ALL, orphanRemoval =
    // true)
    // private Author_Work authorWork;
    // @OneToMany(mappedBy = "author", cascade = CascadeType.ALL)
    // private Set<Author_Work> author_Works = new HashSet<>();

    // @OneToMany(mappedBy = "author", cascade = CascadeType.ALL, orphanRemoval =
    // true)
    // private Set<Author_Work> author_Works;

    // public void setauthor_Works(Author_Work author_Work) {
    // this.author_Works.add(author_Work);
    // }

    // public Set<Author_Work> getauthor_Works() {
    // return author_Works;
    // }

}
