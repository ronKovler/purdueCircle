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
@RequestMapping("/api/modify/")
public class ModifyUserController {

    @Autowired  //Autowired annotation automatically injects an instance
    private UserRepository userRepository;

    /**
    /* Returns -1 if email or username is already taken, otherwise saves information
    /* to database and returns true
    */

    @CrossOrigin
    @RequestMapping(value="modify_first_name", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> modifyFirstName(@RequestBody UserDTO newUserDTO) throws URISyntaxException {

        User newUser = new User(newUserDTO.getPassword(), newUserDTO.getFirstName(), newUserDTO.getLastName(), newUserDTO.getUsername());
        HttpHeaders responseHeaders = new HttpHeaders();
        if (newUserDTO.getFirstName().equals("")) {
            return ResponseEntity.ok().headers(responseHeaders).body(-1);
        }
        User user = userRepository.findByUserID(newUser.getUserID());
        user.setFirstName(newUser.getFirstName());
        return ResponseEntity.ok().headers(responseHeaders).body(user.getUserID());
    }

    @CrossOrigin
    @RequestMapping(value="modify_last_name", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> modifyLastName(@RequestBody UserDTO newUserDTO) throws URISyntaxException {

        HttpHeaders responseHeaders = new HttpHeaders();
        if (newUserDTO.getLastName().equals("")) {
            return ResponseEntity.ok().headers(responseHeaders).body(-1);
        }
        User user = userRepository.findByUserID(newUserDTO.getUserId());
        user.setLastName(newUserDTO.getLastName());
        return ResponseEntity.ok().headers(responseHeaders).body(user.getUserID());
    }

    @CrossOrigin
    @RequestMapping(value="modify_username", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> modifyUsername(@RequestBody UserDTO newUserDTO) throws URISyntaxException{
        HttpHeaders responseHeaders = new HttpHeaders();
        if (newUserDTO.getUsername().equals("")) {
            return ResponseEntity.ok().headers(responseHeaders).body(-1);
        }
        User newUser = new User(newUserDTO.getPassword(), newUserDTO.getFirstName(), newUserDTO.getLastName(), newUserDTO.getUsername());
        User checkExists = userRepository.findByUsername(newUser.getUsername().toLowerCase());
        if (checkExists != null) {
            // Username already in use
            System.out.println("Username already used: " + checkExists.getUsername());
            return ResponseEntity.ok().headers(responseHeaders).body(-1);
        }

        User user = userRepository.findByUserID(newUser.getUserID());
        user.setUsername(newUser.getUsername().toLowerCase());
        return ResponseEntity.ok().headers(responseHeaders).body(user.getUserID());
    }

    // TODO: regex should be checked on frontend
    @CrossOrigin
    @RequestMapping(value="modify_password", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> modifyPassword(@RequestBody UserDTO newUserDTO) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();
        if (newUserDTO.getUsername().equals("")) {
            return ResponseEntity.ok().headers(responseHeaders).body(-1);
        }
        User user = userRepository.findByUserID(newUserDTO.getUserId());
        user.setPassword(newUserDTO.getPassword());
        return ResponseEntity.ok().headers(responseHeaders).body(user.getUserID());
    }

    // TODO: regex should be checked on frontend
    @CrossOrigin
    @RequestMapping(value="modify_phone_number", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> modifyPhoneNumber(@RequestBody User newUser) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();
        User user = userRepository.findByUserID(newUser.getUserID());
        user.setPhoneNumber(newUser.getPhoneNumber());
        return ResponseEntity.ok().headers(responseHeaders).body(user.getUserID());
    }
}