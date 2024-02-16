package com.conference.services;

import java.io.IOException;
import java.util.List;
import java.util.Set;

import org.springframework.web.multipart.MultipartFile;

import com.conference.entities.Authors;
import com.conference.payloads.AuthorDto;
import com.conference.payloads.AuthorWorkDto;

public interface AuthorService {
    AuthorWorkDto CreateAuthorWork(AuthorWorkDto authorWorkDto, Integer conference_id);

    void UploadFile(String path, String filename, MultipartFile file) throws IOException;

    Set<AuthorWorkDto> getallauthors(Integer conference_id);
    // AuthorDto CreateNewAuthor(AuthorDto authorDto);

    // Set<AuthorDto> allworkByconference(Integer conference_id);
}
