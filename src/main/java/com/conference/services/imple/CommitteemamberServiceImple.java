package com.conference.services.imple;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.conference.config.AppConstants;
import com.conference.entities.Conference;
import com.conference.entities.Role;
import com.conference.entities.Users;
import com.conference.payloads.ConferenceDto;
import com.conference.payloads.RoleDto;
import com.conference.payloads.UserDto;
import com.conference.repositories.ConferenceRepo;
import com.conference.repositories.RoleRepo;
import com.conference.repositories.UserRepo;
import com.conference.services.CommitteemamberService;
import com.conference.config.AppConstants;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Null;

@Service
public class CommitteemamberServiceImple implements CommitteemamberService {
    @Autowired
    private ConferenceRepo conferenceRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private RoleRepo roleRepo;

    @Override
    public void CreateCommitteeMember(UserDto userDto) {
        String email = userDto.getEmail();
        String conference = userDto.getConference_name();
        Conference con = this.conferenceRepo.findByConference_name(conference);
        Role role = this.roleRepo.findByRole_name("programme_committee");
        Users existUsers = this.userRepo.findByEmail(email);
        if (existUsers != null) {
            Set<Conference> exConferences = existUsers.getConferences();

            Set<Role> exRoles = existUsers.getRoles();

            if (exConferences.contains(con) && exRoles.contains(role)) {
                // error
            } else {
                exConferences.add(con);
                exRoles.add(role);
                existUsers.setConferences(exConferences);
                existUsers.setRoles(exRoles);
                this.userRepo.save(existUsers);
            }
        } else {
            Set<Conference> conferences = new HashSet<>();
            Set<Role> roles = new HashSet<>();
            conferences.add(con);
            roles.add(role);
            Users user = this.dtoTouser(userDto);
            user.setConferences(conferences);
            user.setRoles(roles);
            this.userRepo.save(user);

        }
    }

    public Users dtoTouser(UserDto userDto) {
        Users user = new Users();
        user.setAddress(userDto.getAddress());
        user.setUser_id(userDto.getUser_id());
        // user.setConference_name(userDto.getConference_name());
        // user.setUser_type(userDto.getUser_type());
        user.setEmail(userDto.getEmail());
        user.setMobile(userDto.getMobile());
        user.setName(userDto.getName());
        user.setPassword(userDto.getPassword());
        return user;

    }

    // public UserDto userTodto(Users user) {
    // // ConferenceServiceImple cs = new ConferenceServiceImple();
    // // RoleServiceImple rs = new RoleServiceImple();
    // // ConferenceDto conferenceDto = this.modelMapper.map(conference,
    // // ConferenceDto.class);
    // // Set<RoleDto> roleDto = user.getRoles().stream().map(con ->
    // // this.modelMapper.map(con, RoleDto.class))
    // // .collect(Collectors.toSet());
    // UserDto userDto = new UserDto();
    // userDto.setUser_id(user.getUser_id());
    // userDto.setAddress(user.getAddress());
    // userDto.setEmail(user.getEmail());
    // userDto.setMobile(user.getMobile());
    // userDto.setName(user.getName());
    // // userDto.setConference_name(user.getConference_name());
    // // userDto.setUser_type(user.getUser_type());
    // userDto.setPassword(user.getPassword());
    // userDto.setConference(new
    // ConferenceServiceImple().entityTodto(user.getConference()));
    // Set<RoleDto> ans = new HashSet<>();
    // for (Role r : user.getRoles()) {
    // RoleDto rt = this.roleTodto(r);
    // ans.add(rt);
    // }
    // userDto.setRoles(ans);
    // // userDto.setRoles(roleDto);

    // return userDto;

    // }

    public RoleDto roleTodto(Role role) {
        RoleDto roleDto = new RoleDto();
        roleDto.setRole_id(role.getRole_id());
        roleDto.setRole_name(role.getRole_name());
        return roleDto;
    }
}
