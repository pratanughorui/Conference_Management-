package com.conference;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.conference.config.AppConstants;
import com.conference.entities.Role;
import com.conference.repositories.RoleRepo;

@SpringBootApplication
public class ConferenceManagment1Application implements CommandLineRunner {
	@Autowired
	private RoleRepo rolerepo;

	public static void main(String[] args) {
		SpringApplication.run(ConferenceManagment1Application.class, args);
	}

	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}

	@Override
	public void run(String... args) throws Exception {
		try {
			Role role1 = new Role();
			role1.setRole_id(AppConstants.super_user);
			role1.setRole_name("Super User");
			Role role2 = new Role();
			role2.setRole_id(AppConstants.programme_committee);
			role2.setRole_name("Programme Committee");
			Role role3 = new Role();
			role3.setRole_id(AppConstants.paper_reviewer);
			role3.setRole_name("Paper Reviewer");
			List<Role> result = List.of(role1, role2, role3);
			this.rolerepo.saveAll(result);

		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
	}

}
