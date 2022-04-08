package com.purduecircle.backend.controller;

import com.purduecircle.backend.models.User;
import com.purduecircle.backend.models.UserDTO;
import com.purduecircle.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;



@RestController()
//@CrossOrigin("www.purduecircle.me")
@CrossOrigin

@RequestMapping("/api/auth/")
public class AuthController {
    @Autowired
    UserRepository userRepository;

    @RequestMapping(value="login", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserDTO> tryLogin(@RequestBody User newUser) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();
        //DON'T TOUCH ABOVE

        System.out.println("RECEIVED USER " + newUser.getEmail()); //Test for server

        User checkExists = userRepository.findByEmailEqualsAndPasswordEquals(newUser.getEmail(),
                newUser.getPassword());

        if (checkExists == null) {
            checkExists = userRepository.findByUsernameEqualsAndPasswordEquals(newUser.getUsername(),
                    newUser.getPassword());
        }

        if (checkExists != null) {
            System.out.println("FOUND CHECK EXISTS USER: " + checkExists.getUsername());
            UserDTO existsDTO = new UserDTO(checkExists);
            return ResponseEntity.ok().headers(responseHeaders).body(existsDTO);
        }
        UserDTO failed = new UserDTO(-1, "Invalid", "Invalid", "Invalid", "Invalid", "Invalid", false);

        return ResponseEntity.ok().headers(responseHeaders).body(failed);
    }
}
