package com.purduecircle.backend.controller;

import com.purduecircle.backend.repository.UserRepository;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.purduecircle.backend.models.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.net.URISyntaxException;
import java.util.Locale;

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

    /**
    /* Returns false if username or password is already taken, otherwise saves information
    /* to database and returns true
    */

    @CrossOrigin
    @RequestMapping(value="create_account", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> tryLogin(@RequestBody User newUser) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();

        // Ensure email is not already in use
        User checkExists = userRepository.findByEmail(newUser.getEmail());
        if (checkExists != null) {
            System.out.println("Email already used: " + checkExists.getEmail());
            return ResponseEntity.ok().headers(responseHeaders).body(-1);
        }

        // Ensure username is not already in use
        checkExists = null;
        checkExists = userRepository.findByUsername(newUser.getUsername());
        if (checkExists != null) {
            System.out.println("Username already used: " + checkExists.getUsername());
            return ResponseEntity.ok().headers(responseHeaders).body(-1);
        }

        userRepository.save(newUser);
        // Ensure username is all lowercase
        newUser.setUsername(newUser.getUsername().toLowerCase());
        return ResponseEntity.ok().headers(responseHeaders).body(checkExists.getUserID());
    }

    @CrossOrigin
    @RequestMapping(value="follow_topic", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> followTopic(@RequestBody User newUser, String topicStr) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();
        User user = userRepository.findByUserID(newUser.getUserID());
        // TODO - topic repository
        user.addFollowedTopic(topic);
        return ResponseEntity.ok().headers(responseHeaders).body(user.getUserID());
    }
}
