package com.conference.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.conference.payloads.AllotmentDto;
import com.conference.services.AllotmentsService;

@RestController
@RequestMapping("/allotment")
public class AllotmentController {
    @Autowired
    private AllotmentsService allotmentsService;

    @PostMapping("/papersallot/{conference_id}")
    public ResponseEntity<?> createpaperallot(@RequestBody List<AllotmentDto> allotmentDtos,
            @PathVariable Integer conference_id) {
        this.allotmentsService.createallot(allotmentDtos, conference_id);
        return new ResponseEntity<>("done", HttpStatus.OK);
    }

    @GetMapping("/getpaper/{reviewer_id}")
    public List<AllotmentDto> getpaper(@PathVariable Integer reviewer_id) {
        List<AllotmentDto> a = this.allotmentsService.getpapers(reviewer_id);
        return a;
    }
}
