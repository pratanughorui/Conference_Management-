package com.conference.services.imple;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.conference.config.AppConstants;
import com.conference.entities.Conference;
import com.conference.entities.Role;
import com.conference.entities.Users;
import com.conference.exceptions.ResourceNotFoundException;
import com.conference.payloads.ConferenceDto;
import com.conference.payloads.RoleDto;
import com.conference.payloads.UserDto;
import com.conference.repositories.ConferenceRepo;
import com.conference.repositories.RoleRepo;
import com.conference.repositories.UserRepo;
import com.conference.services.UserService;
import com.conference.services.ConferenceService;

@Service
public class UserServiceImple implements UserService {
        @Autowired
        private UserRepo userRepo;
        @Autowired
        private ConferenceRepo conferenceRepo;
        @Autowired
        private RoleRepo roleRepo;
        @Autowired
        private ModelMapper modelMapper;
        // @Autowired
        // private PasswordEncoder passwordEncoder;

        // @Override
        // public UserDto createUser(UserDto userDto) {
        // // System.out.println(role_id + " " + conference_id);
        // // Conference conference = this.conferenceRepo.findById(conference_id)
        // // .orElseThrow(() -> new ResourceNotFoundException("Conference", "id",
        // // conference_id));
        // String user_type = userDto.getUser_type();
        // String conference_name = userDto.getConference_name();
        // System.out.println("hisisisisiissi");
        // Users existingUser = this.userRepo.findByEmail(userDto.getEmail());
        // if (existingUser != null) {
        // Set<Role> existingRoles = existingUser.getRoles();
        // Role newRole = this.roleRepo.findByRole_name(user_type);
        // if (existingRoles.contains(newRole)) {
        // // handle this error
        // throw new DataIntegrityViolationException("User already has the specified
        // role");
        // } else {
        // existingUser.getRoles().add(newRole);
        // this.userRepo.save(existingUser);
        // }
        // return this.userTodto(existingUser);
        // } else {
        // Users newUser = this.dtoTouser(userDto);
        // Set<Role> role = this.roleRepo.findByAllRole_name(user_type);
        // Conference conferences =
        // this.conferenceRepo.findByConference_name(conference_name);
        // if (conferences == null) {
        // return null;
        // }
        // newUser.setConference(conferences);
        // newUser.setRoles(role);
        // Users savedUser = this.userRepo.save(newUser);
        // return this.userTodto(savedUser);
        // }

        // }

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
        // ConferenceServiceImple().entityTodto(user.getConferences()));
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

        @Override
        public UserDto updateUser(UserDto userDto, Integer user_id) {
                // TODO Auto-generated method stub
                Users user = this.userRepo.findById(user_id)
                                .orElseThrow(() -> new ResourceNotFoundException("Users", "id", user_id));
                user.setAddress(userDto.getAddress());
                user.setEmail(userDto.getEmail());
                user.setMobile(userDto.getMobile());
                user.setName(userDto.getName());
                user.setPassword(userDto.getPassword());
                Users updatUsers = this.userRepo.save(user);
                return this.modelMapper.map(updatUsers, UserDto.class);

                // throw new UnsupportedOperationException("Unimplemented method 'updateUser'");
        }

        @Override
        public void deleteUserById(Integer user_id) {
                // TODO Auto-generated method stub
                Users user = this.userRepo.findById(user_id)
                                .orElseThrow(() -> new ResourceNotFoundException("Users", "id", user_id));
                this.userRepo.deleteById(user_id);

                // throw new UnsupportedOperationException("Unimplemented method 'deleteUser'");
        }

        // @Override
        // public List<UserDto> getAllUser() {
        // // TODO Auto-generated method stub
        // List<Users> user = this.userRepo.findAll();
        // List<UserDto> userDto = user.stream().map(con -> this.userTodto(con))
        // .collect(Collectors.toList());
        // return userDto;
        // // throw new UnsupportedOperationException("Unimplemented method
        // 'getAllUser'");
        // }

        @Override
        public UserDto getUserById(Integer user_id) {
                // TODO Auto-generated method stub
                Users user = this.userRepo.findById(user_id)
                                .orElseThrow(() -> new ResourceNotFoundException("Users", "id", user_id));

                return this.modelMapper.map(user, UserDto.class);
                // throw new UnsupportedOperationException("Unimplemented method
                // 'getUserById'");
        }

        // @Override
        // public List<UserDto> getAllUserByRole(Integer role_id) {
        // // TODO Auto-generated method stub
        // Role role = this.roleRepo.findById(role_id)
        // .orElseThrow(() -> new ResourceNotFoundException("Role", "id", role_id));

        // List<Users> user = this.userRepo.findByRole(role);
        // List<UserDto> userDto = user.stream()
        // .map(con -> this.modelMapper.map(con, UserDto.class))
        // .collect(Collectors.toList());
        // return userDto;
        // // throw new UnsupportedOperationException("Unimplemented method
        // // 'getAllUserByRole'");
        // }

        // @Override
        // public List<UserDto> getAllUserByConference(Integer conference_id) {
        // Conference conference = this.conferenceRepo.findById(conference_id)
        // .orElseThrow(() -> new ResourceNotFoundException("Conference", "id",
        // conference_id));
        // List<Users> user = this.userRepo.findByConference(conference);
        // List<UserDto> userDto = user.stream()
        // .map(con -> this.modelMapper.map(con, UserDto.class))
        // .collect(Collectors.toList());
        // return userDto;
        // }

}