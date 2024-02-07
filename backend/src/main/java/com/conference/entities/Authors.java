package com.conference.entities;

import java.util.HashSet;
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
    private String name;
    private String address;
    private String password;
    private String mobile;
    @Column(unique = true)
    private String email;

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
