package com.purduecircle.backend;

//import com.purduecircle.backend.DTO.UserDTO;
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


    @CrossOrigin
    @RequestMapping(value="login", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> tryLogin(@RequestBody User newUser) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();
        //DON'T TOUCH ABOVE

        System.out.println("RECEIVED USER " + newUser.getEmail()); //Test for server

        User checkExists = userRepository.findByEmailEqualsAndPasswordEquals(newUser.getEmail(),
                newUser.getPassword());

        if (checkExists != null) {
            System.out.println("FOUND CHECK EXISTS USER: " + checkExists.getUsername());
            return ResponseEntity.ok().headers(responseHeaders).body(checkExists.getUserID());
        }

        return ResponseEntity.ok().headers(responseHeaders).body(-1);
    }
}
