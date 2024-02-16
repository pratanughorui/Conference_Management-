package com.conference.services.imple;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.List;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.conference.config.AppConstants;

import com.conference.entities.Authors;
import com.conference.entities.Authors_work;
import com.conference.entities.Conference;
import com.conference.entities.Role;
import com.conference.entities.Users;
import com.conference.entities.Work;
import com.conference.exceptions.ResourceNotFoundException;
import com.conference.payloads.AuthorDto;
import com.conference.payloads.AuthorWorkDto;
import com.conference.payloads.ConferenceDto;
import com.conference.payloads.UserDto;
import com.conference.repositories.AuthorRepo;
import com.conference.repositories.Authors_workRepo;
import com.conference.repositories.ConferenceRepo;
import com.conference.repositories.UserRepo;
import com.conference.repositories.WorkRepo;
import com.conference.services.AuthorService;

@Service
public class AuthorServiceImple implements AuthorService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private AuthorRepo authorRepo;
    @Autowired
    private ConferenceRepo conferenceRepo;
    @Autowired
    private WorkRepo workRepo;

    @Autowired
    private Authors_workRepo authors_workRepo;

    @Override
    public AuthorWorkDto CreateAuthorWork(AuthorWorkDto authorWorkDto, Integer conference_id) {
        Conference conference = this.conferenceRepo.findById(conference_id)
                .orElseThrow(() -> new ResourceNotFoundException("Conference", "id", conference_id));
        Authors_work authors_work = this.modelMapper.map(authorWorkDto, Authors_work.class);
        authors_work.setConferences(conference);
        Authors_work saved_authors_work = this.authors_workRepo.save(authors_work);
        String pdfname = authorWorkDto.getPdf_name();
        String filename = Integer.toString(saved_authors_work.getAuthor_id())
                .concat(pdfname.substring(pdfname.lastIndexOf(".")));
        saved_authors_work.setPdf_name(filename);
        authors_work = this.authors_workRepo.save(saved_authors_work);
        return this.modelMapper.map(authors_work, AuthorWorkDto.class);

    }

    // public Author_Work dtoToentity(AuthorWorkDto authorWorkDto) {
    // Author_Work author_Work = new Author_Work();
    // // author_Work.setWork_id(authorWorkDto.getWork_id());
    // author_Work.setAbstractText(authorWorkDto.getAbstractText());

    // author_Work.setTrack(authorWorkDto.getTrack());
    // // author_Work.setPdf_name(authorWorkDto.getPdf_name());
    // author_Work.setKey_words(authorWorkDto.getKey_words());
    // return author_Work;
    // }

    // public AuthorWorkDto entityTodto(Author_Work author_Work) {
    // AuthorWorkDto authorWorkDto = new AuthorWorkDto();
    // // authorWorkDto.setWork_id(author_Work.getWork_id());
    // // authorWorkDto.setPdf_name(author_Work.getPdf_name());
    // authorWorkDto.setAbstractText(author_Work.getAbstractText());
    // authorWorkDto.setKey_words(author_Work.getKey_words());

    // authorWorkDto.setTrack(author_Work.getTrack());

    // // authorWorkDto.setAuthor(this.entityTodto(author_Work.getAuthor()));
    // // authorWorkDto.setConference(this.modelMapper.map(conference,
    // // ConferenceDto.class));
    // return authorWorkDto;
    // }

    @Override
    public void UploadFile(String path, String filename, MultipartFile file) {
        String filepath = path + File.separator + filename;
        File f = new File(path);
        if (!f.exists()) {
            f.mkdir();
        }
        try {
            Files.copy(file.getInputStream(), Paths.get(filepath));
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    /*
     * @Override
     * public AuthorDto CreateNewAuthor(AuthorDto authorDto) {
     * String conference_name = authorDto.getConference_name();
     * Conference conferences =
     * this.conferenceRepo.findByConference_title(conference_name);
     * if (conferences == null) {
     * return null;
     * }
     * 
     * Authors author = this.dtoToentity(authorDto);
     * author.setConference(conferences);
     * Authors createdauthor = this.authorRepo.save(author);
     * return this.entityTodto(createdauthor);
     * // String conference_name = userDto.getConference_name();
     * // Users user = this.modelMapper.map(userDto, Users.class);
     * // user.setPassword(user.getPassword());
     * // Role role = this.roleRepo.findById(AppConstants.author).get();
     * 
     * // Set<Conference> conference =
     * // this.conferenceRepo.findByConference_name(conference_name);
     * // if (conference == null) {
     * // return null;
     * // }
     * // user.getRoles().add(role);
     * // user.setConferences(conference);
     * // Users newuser = this.userRepo.save(user);
     * // return this.modelMapper.map(newuser, UserDto.class);
     * 
     * }
     */

    public Authors dtoToentity(AuthorDto authorDto) {
        Authors author = new Authors();
        author.setAuthor_id(authorDto.getAuthor_id());
        author.setAddress(authorDto.getAddress());
        author.setEmail(authorDto.getEmail());
        // author.setMobile(authorDto.getMobile());
        author.setName(authorDto.getName());
        // author.setPassword(authorDto.getPassword());
        // author.setConference(new
        // ConferenceServiceImple().dtoToentity(authorDto.getConference()));
        return author;
    }

    public AuthorDto entityTodto(Authors authors) {
        AuthorDto authorDto = new AuthorDto();
        authorDto.setAuthor_id(authors.getAuthor_id());
        authorDto.setAddress(authors.getAddress());
        authorDto.setEmail(authors.getEmail());
        // authorDto.setMobile(authors.getMobile());
        authorDto.setName(authors.getName());
        // authorDto.setPassword(authors.getPassword());
        // authorDto.setConference(new
        // ConferenceServiceImple().entityTodto(authors.getConference()));
        // authorDto.setAuthorWorkDto(this.entityTodto(au, authors));
        return authorDto;
    }

    @Override
    public Set<AuthorWorkDto> getallauthors(Integer conference_id) {
        // TODO Auto-generated method stub
        Conference conference = this.conferenceRepo.findById(conference_id)
                .orElseThrow(() -> new ResourceNotFoundException("Conference", "id", conference_id));
        Set<Authors_work> authors_works = conference.getAuthors();
        Set<AuthorWorkDto> authorWorkDtos = authors_works.stream()
                .map(con -> this.modelMapper.map(con, AuthorWorkDto.class))
                .collect(Collectors.toSet());
        return authorWorkDtos;
    }

    // @Override
    // public Set<AuthorDto> allworkByconference(Integer conference_id) {
    // Conference conference = this.conferenceRepo.findById(conference_id)
    // .orElseThrow(() -> new ResourceNotFoundException("Conference", "id",
    // conference_id));
    // Set<AuthorDto> authorDtos = new HashSet<>();
    // for (Authors author : conference.getAuthor()) {
    // AuthorDto authorDto = this.entityTodto(author);
    // authorDto.setAuthorWorkDto(this.entityTodto(author.getAuthorWork()));
    // authorDtos.add(authorDto);
    // }
    // return authorDtos;
    // }

}
