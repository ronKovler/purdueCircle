package com.purduecircle.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.purduecircle.backend.models.*;
import org.springframework.beans.factory.annotation.Autowired;

@SpringBootApplication
public class BackendApplication {

	@Autowired	//Autowired annotation automatically injects an instance
	static UserRepository userRepository;

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
		test();
	}

	static public void test() {

		User newUser = new User();
		newUser.setFirstName("Bob"); 

		userRepository.save(newUser);

	}

}
