package com.purduecircle.backend;

import com.purduecircle.backend.repository.UserRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class BackendApplication {

	@Autowired	//Autowired annotation automatically injects an instance
	static UserRepository userRepository;

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
		System.out.println("PRINTTTTTTTTTTTTTTTTTTTTTTTTTT");
		//test();
	}
	/*
	static public void test() {

		User newUser = new User();
		newUser.setFirstName("Bob"); 

		userRepository.save(newUser);

	}
	*/
}
