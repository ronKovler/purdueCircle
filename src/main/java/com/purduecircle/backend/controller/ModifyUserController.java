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
//@CrossOrigin("www.purduecircle.me")
@CrossOrigin
@RequestMapping("/api/modify/")
public class ModifyUserController {

    @Autowired  //Autowired annotation automatically injects an instance
    private UserRepository userRepository;

    /**
    /* Returns -1 if username is already taken, otherwise saves information
    /* to database and returns true
    /* Returns 1 if an empty string was passed
    */

    @RequestMapping(value="modify_first_name", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> modifyFirstName(@RequestBody User argUser) throws URISyntaxException {

        HttpHeaders responseHeaders = new HttpHeaders();
        if (argUser.getFirstName().equals("")) {
            return ResponseEntity.ok().headers(responseHeaders).body(1);
        }
        User user = userRepository.findByEmailEquals(argUser.getEmail());
        user.setFirstName(argUser.getFirstName());
        userRepository.save(user);
        return ResponseEntity.ok().headers(responseHeaders).body(user.getUserID());
    }

    @RequestMapping(value="modify_last_name", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> modifyLastName(@RequestBody User argUser) throws URISyntaxException {

        HttpHeaders responseHeaders = new HttpHeaders();
        if (argUser.getLastName().equals("")) {
            return ResponseEntity.ok().headers(responseHeaders).body(1);
        }
        User user = userRepository.findByEmailEquals(argUser.getEmail());
        user.setLastName(argUser.getLastName());
        userRepository.save(user);
        return ResponseEntity.ok().headers(responseHeaders).body(user.getUserID());
    }

    @RequestMapping(value="modify_username", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> modifyUsername(@RequestBody User argUser) throws URISyntaxException{
        HttpHeaders responseHeaders = new HttpHeaders();
        if (argUser.getUsername().equals("")) {
            return ResponseEntity.ok().headers(responseHeaders).body(1);
        }
        User checkExists = userRepository.findByUsername(argUser.getUsername().toLowerCase());
        if (checkExists != null) {
            // Username already in use
            System.out.println("Username already used: " + checkExists.getUsername());
            return ResponseEntity.ok().headers(responseHeaders).body(-1);
        }

        User user = userRepository.findByEmailEquals(argUser.getEmail());
        user.setUsername(argUser.getUsername().toLowerCase());
        userRepository.save(user);
        return ResponseEntity.ok().headers(responseHeaders).body(user.getUserID());
    }

    @RequestMapping(value="modify_password", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> createAccount(@RequestBody User argUser) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();
        if (argUser.getPassword().equals("")) {
            return ResponseEntity.ok().headers(responseHeaders).body(1);
        }
        User user = userRepository.findByEmailEquals(argUser.getEmail());
        user.setPassword(argUser.getPassword());
        System.out.printf("Changing password to: " + argUser.getPassword());
        userRepository.save(user);
        return ResponseEntity.ok().headers(responseHeaders).body(user.getUserID());
    }

    // TODO: regex should be checked on frontend
    @RequestMapping(value="modify_phone_number", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> modifyPhoneNumber(@RequestBody User newUser) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();
        User user = userRepository.findByUserID(newUser.getUserID());
        user.setPhoneNumber(newUser.getPhoneNumber());
        return ResponseEntity.ok().headers(responseHeaders).body(user.getUserID());
    }
}