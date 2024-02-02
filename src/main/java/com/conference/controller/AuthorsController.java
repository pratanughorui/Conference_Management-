package com.conference.controller;

import java.io.IOException;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.conference.payloads.ApiResponse;
import com.conference.payloads.AuthorDto;
import com.conference.payloads.AuthorWorkDto;
import com.conference.services.AuthorService;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/authors")
public class AuthorsController {
    @Autowired
    private AuthorService authorService;
    @Value("${project.folder}")
    private String path;
    @Autowired
    private ObjectMapper objectMapper;

    @PostMapping("/uploadwork/{author_id}")
    public ResponseEntity<?> UploadWork(@RequestParam("files") MultipartFile files,
            @RequestParam("authorWorks") String authorWorks,
            @PathVariable Integer author_id) throws IOException {
        AuthorWorkDto authorWorkDto = objectMapper.readValue(authorWorks,
                AuthorWorkDto.class);
        String filename = files.getOriginalFilename();
        authorWorkDto.setPdf_name(filename);
        AuthorWorkDto at = this.authorService.CreateAuthorWork(authorWorkDto,
                author_id);
        if (at == null) {
            return new ResponseEntity<>(Map.of("message", "Conference not available"),
                    HttpStatus.OK);
        }
        filename = at.getPdf_name();
        this.authorService.UploadFile(path, filename, files);
        return new ResponseEntity<AuthorWorkDto>(at, HttpStatus.OK);

    }

    @PostMapping("/createnewauthor")
    public ResponseEntity<AuthorDto> createnewauthor(@RequestBody AuthorDto authorDto) {
        AuthorDto newauthorDto = this.authorService.CreateNewAuthor(authorDto);
        return new ResponseEntity<AuthorDto>(newauthorDto, HttpStatus.OK);
    }

    // @GetMapping("/getallauthorwork/{conference_id}")
    // public Set<AuthorDto> getallauthorwork(@PathVariable Integer conference_id) {
    // Set<AuthorDto> work_list =
    // this.authorService.allworkByconference(conference_id);
    // return work_list;
    // }

}
