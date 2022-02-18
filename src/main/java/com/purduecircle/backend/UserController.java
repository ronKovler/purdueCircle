package com.purduecircle.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.purduecircle.backend.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

@RestController
public class UserController {

    @Autowired  //Autowired annotation automatically injects an instance
    private UserRepository userRepository;

    @GetMapping("/checkConnection")
    public String testConnection() {
        return "Connection Successful";
    }

    /**
     * TODO Add code to handle home page.
     * any request (GET, POST, PUT, etc.) to the root URL(/) will be
     * handled here within this method
     * @return String, might change to a file or whatever down the line
     */
    @RequestMapping("/")
    public String home() {
        return "Add Code here to handle home page";
    }

    // localhost:8081
    // user and generated password
    // TODO: catch exceptions
    @GetMapping("/test")
    public void testDatabase() {
        User newUser = new User();
        newUser.setFirstName("testName");
        newUser.setLastName("testName");
        newUser.setEmail("testEmail");
        newUser.setUsername("testUsername");
        newUser.setPassword("testPassword");
        userRepository.save(newUser);

        long count = userRepository.count();
        System.out.println("Number of users: " + count);
        return;
    }
}
