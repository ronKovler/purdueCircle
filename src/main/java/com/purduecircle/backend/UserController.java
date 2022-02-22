package com.purduecircle.backend;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.purduecircle.backend.models.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.net.URISyntaxException;
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

    /**
    /* Returns false if username or password is already taken, otherwise saves information
    /* to database and returns true
    */

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
