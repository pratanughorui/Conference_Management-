package com.conference.entities;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Conference")
@NoArgsConstructor
@Getter
@Setter
public class Conference {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int conference_id;
  @Column(unique = true)
  private String conferences_name;
  private String organization_name;
  private String subject;
  private String track;
  private String venue;
  private String start_date;
  private String close_date;
  @CreationTimestamp // This annotation automatically populates the field with the current timestamp
                     // on entity creation
  @Column(name = "creation_date_time", updatable = false)
  private LocalDateTime creationDateTime;
  // @OneToMany(mappedBy = "conference", cascade = CascadeType.ALL)
  // private Set<Author_Work> author_Works = new HashSet<>();

  // @OneToMany(mappedBy = "conference", cascade = CascadeType.ALL, orphanRemoval
  // = true)
  // private Set<Author_Work> author_Works;

  // @ManyToMany
  // @JoinTable(name = "conference_user", joinColumns = @JoinColumn(name =
  // "conference_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
  // private Set<Users> attendees;

  @ManyToMany(mappedBy = "conferences")
  private Set<Users> user = new HashSet<>();

  // @ManyToMany
  // @JoinTable(name = "conference_user", joinColumns = @JoinColumn(name =
  // "conference_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
  // private Set<Users> user = new HashSet<>();

  // @OneToMany(mappedBy = "conference", cascade = CascadeType.ALL, orphanRemoval
  // = true)
  // private Set<Authors> author;

  // @OneToMany(mappedBy = "conference", cascade = CascadeType.ALL)
  // private List<Track> tracks;

  // public void setauthor_Works(Author_Work author_Work) {
  // this.author_Works.add(author_Work);
  // }

  // public void setuser(Users user) {
  // this.user.add(user);
  // }

  // public Set<Author_Work> getauthor_Works() {
  // return author_Works;
  // }

  // public Set<Users> getuser() {
  // return user;
  // }
}
