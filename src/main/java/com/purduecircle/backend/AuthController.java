package com.purduecircle.backend;

import com.purduecircle.backend.DTO.UserDTO;
import com.purduecircle.backend.models.User;
import com.purduecircle.backend.models.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.util.List;

@RestController()
@RequestMapping("/api/auth/")
public class AuthController {
    @Autowired
    UserRepository userRepository;

    /*
    @GetMapping("/{id}")
    public User getClient(@PathVariable Long id) {
        return clientRepository.findById(id).orElseThrow(RuntimeException::new);
    }

     */

    @CrossOrigin
    //@PostMapping("login")
    @RequestMapping(value="login", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> tryLogin(@RequestBody User newUserDTO) throws URISyntaxException {

        System.out.println("RECEIVED USER" + newUserDTO.getEmail());/*
        User newUser = new User(newUserDTO.getEmail(), newUserDTO.getPassword());
        List<User> users = userRepository.findAll();
        for (User check : users) {
            if (check.equals(newUser)) {
                return new ResponseEntity<Integer>(check.getUserID(), HttpStatus.OK);
            }
        }*/
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("Header-Test",
                "ID");
        //return new ResponseEntity<Integer>(-1, HttpStatus.OK);

        //System.out.println(temp);
        return ResponseEntity.ok().headers(responseHeaders).body(-1);
    }
}
