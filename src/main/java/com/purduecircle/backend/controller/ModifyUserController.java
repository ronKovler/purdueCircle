package com.purduecircle.backend.controller;

import com.purduecircle.backend.repository.UserRepository;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.purduecircle.backend.models.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.net.URISyntaxException;

@RestController
public class ModifyUserController {

    @Autowired  //Autowired annotation automatically injects an instance
    private UserRepository userRepository;

    /**
    /* Returns -1 if email or username is already taken, otherwise saves information
    /* to database and returns true
    */

    // TODO: will need to send UserID and new requested first name
    @CrossOrigin
    @RequestMapping(value="modify_first_name", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> modifyFirstName(@RequestBody User newUser) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();


        User user = userRepository.findByUserID(newUser.getUserID);
        user.setFirstName(newUser.getFirstName());


        User checkExists = userRepository.findByEmail(newUser.getEmail());
        if (checkExists != null) {
            System.out.println("Email already used: " + checkExists.getEmail());
            return ResponseEntity.ok().headers(responseHeaders).body(-1);
        }

        checkExists = null;
        checkExists = userRepository.findByUsername(newUser.getUsername());
        if (checkExists != null) {
            System.out.println("Username already used: " + checkExists.getUsername());
            return ResponseEntity.ok().headers(responseHeaders).body(-1);
        }

        userRepository.save(newUser);
        return ResponseEntity.ok().headers(responseHeaders).body(checkExists.getUserID());
    }

    @CrossOrigin
    @RequestMapping(value="modify_last_name", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> modifyLastName(@RequestBody User newUser) throws URISyntaxException {
    }

    @CrossOrigin
    @RequestMapping(value="modify_username", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> modifyUsername(@RequestBody User newUser) throws URISyntaxException {
    }

    // TODO: regex should be checked on frontend
    @CrossOrigin
    @RequestMapping(value="modify_password", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> modifyPassword(@RequestBody User newUser) throws URISyntaxException {
    }

    // TODO: regex should be checked on frontend
    @CrossOrigin
    @RequestMapping(value="modify_phone_number", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> modifyPhoneNumber(@RequestBody User newUser) throws URISyntaxException {
    }
}


