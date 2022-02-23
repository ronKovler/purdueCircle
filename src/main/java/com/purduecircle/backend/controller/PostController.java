package com.purduecircle.backend.controller;

import com.purduecircle.backend.repository.PostRepository;
import com.purduecircle.backend.repository.UserRepository;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.purduecircle.backend.newModels.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.net.URISyntaxException;

@RestController
@RequestMapping("/api/post/")
public class PostController {

    @Autowired  //Autowired annotation automatically injects an instance
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    @CrossOrigin
    @RequestMapping(value="create_account", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> tryLogin(@RequestBody User newUser) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();
        //DON'T TOUCH ABOVE

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
}
