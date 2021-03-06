package com.purduecircle.backend.controller;

import com.purduecircle.backend.repository.PostRepository;
import com.purduecircle.backend.repository.UserRepository;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.purduecircle.backend.models.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;

@RestController
//@CrossOrigin("www.purduecircle.me")
@CrossOrigin
@RequestMapping("/api/modify/")
public class ModifyUserController {

    @Autowired  //Autowired annotation automatically injects an instance
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    public static final String ANSI_RESET = "\u001B[0m";

    public static final String ANSI_YELLOW = "\u001B[33m";

    public String pColor(String text) {
        return ANSI_YELLOW + text + ANSI_RESET;
    }

    /**
    /* Returns -1 if username is already taken, otherwise saves information
    /* to database and returns true
    /* Returns 1 if an empty string was passed
    */

    @RequestMapping(value="modify_first_name", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> modifyFirstName(@RequestBody User argUser){

        // TODO: All these functions only work with findByEmail() and not the getByUserID()
        System.out.println("\t\tID: " + argUser.getUserID());
        System.out.println("\t\tEmail: " + argUser.getEmail());
        System.out.println("\t\tPassword: " + argUser.getPassword());
        System.out.println("\t\tFirst Name: " + argUser.getFirstName());
        System.out.println("\t\tLast Name: " + argUser.getLastName());
        System.out.println("\t\tUsername: " + argUser.getUsername());

        HttpHeaders responseHeaders = new HttpHeaders();
        if (argUser.getFirstName().equals("")) {
            return ResponseEntity.ok().headers(responseHeaders).body(-1);
        }
        User user = userRepository.getByUserID(argUser.getUserID());
        user.setFirstName(argUser.getFirstName());
        userRepository.save(user);
        return ResponseEntity.ok().headers(responseHeaders).body(user.getUserID());
    }

    @RequestMapping(value="modify_last_name", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> modifyLastName(@RequestBody User argUser) throws URISyntaxException {

        HttpHeaders responseHeaders = new HttpHeaders();
        if (argUser.getLastName().equals("")) {
            return ResponseEntity.ok().headers(responseHeaders).body(-1);
        }
        User user = userRepository.getByUserID(argUser.getUserID());
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

        User user = userRepository.getByUserID(argUser.getUserID());
        user.setUsername(argUser.getUsername().toLowerCase());
        userRepository.save(user);
        return ResponseEntity.ok().headers(responseHeaders).body(user.getUserID());
    }

    @RequestMapping(value="modify_password", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> createAccount(@RequestBody User argUser) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();
        if (argUser.getPassword().equals("")) {
            return ResponseEntity.ok().headers(responseHeaders).body(-1);
        }
        User user = userRepository.getByUserID(argUser.getUserID());
        user.setPassword(argUser.getPassword());
        System.out.printf("Changing password to: " + argUser.getPassword());
        userRepository.save(user);
        return ResponseEntity.ok().headers(responseHeaders).body(user.getUserID());
    }

    // TODO: regex should be checked on frontend
    @RequestMapping(value="modify_phone_number", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> modifyPhoneNumber(@RequestBody User argUser) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();
        User user = userRepository.getByUserID(argUser.getUserID());

        user.setPhoneNumber(argUser.getPhoneNumber());
        return ResponseEntity.ok().headers(responseHeaders).body(user.getUserID());
    }

    @RequestMapping(value="modify_private", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> modifyPrivate(@RequestBody UserDTO argUser) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();
        User user = userRepository.getByUserID(argUser.getUserID());

        user.setPrivate(argUser.isPrivate());
        System.out.println(pColor("Changing Private to " + argUser.isPrivate()) +"\n\n");
        userRepository.save(user);
        System.out.println(pColor("Firstname \t: " + argUser.getFirstName() +
                "\nLastname \t: " + argUser.getLastName() +
                "\nisPrivate \t: " + argUser.isPrivate() +
                "\nUserID \t: " + argUser.getUserID() +
                "\nPassword \t: " + argUser.getPassword()));
        return ResponseEntity.ok().headers(responseHeaders).body(user.getUserID());
    }

    @RequestMapping(value="modify_message_restriction", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> modifyRestriction(@RequestBody UserDTO argUser) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();
        User user = userRepository.getByUserID(argUser.getUserID());

        user.setRestricted(argUser.isRestricted());
        userRepository.save(user);
        return ResponseEntity.ok().headers(responseHeaders).body(user.getUserID());
    }

    @RequestMapping(value="modify_user", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> modifyUser(@RequestBody UserDTO argUser) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();
        User user = userRepository.getByUserID(argUser.getUserID());
        User checkConflicting = userRepository.findByUsername(argUser.getUsername());
        if (argUser.getUsername() != null) {
            if (checkConflicting != null) {
                return ResponseEntity.badRequest().body(-1);
            }
            user.setUsername((argUser.getUsername()));
        }
        if (argUser.getPassword() != null) {
            user.setPassword(argUser.getPassword());
        }
        if (argUser.getFirstName() != null) {
            user.setFirstName(argUser.getFirstName());
        }
        if (argUser.getLastName() != null) {
            user.setLastName(argUser.getLastName());
        }
        if (argUser.getProfileImagePath() != null) {
            String path = "userImages/" +
                    argUser.getProfileImagePath().substring(argUser.getProfileImagePath().lastIndexOf('/') + 1);

            File toDelete = new File(path);
            if (toDelete.exists()) {
                System.out.println(pColor("FILE EXISTS: " + toDelete.getName()));
                if (toDelete.delete()) {
                    System.out.println(pColor("FILE DELETED: " + toDelete.getName()));
                } else {
                    System.out.println(pColor("ERROR COULD NOT DELETE: " + toDelete.getName()));
                }
            }

            user.setProfileImagePath(argUser.getProfileImagePath());
        }

        user.setPrivate((argUser.isPrivate()));
        user.setRestricted(argUser.isRestricted());
        userRepository.save(user);
        return ResponseEntity.ok().headers(responseHeaders).body(user.getUserID());
    }

    @RequestMapping(value="delete_account", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> deleteAccount(@RequestBody User argUser) throws URISyntaxException, IOException {
        HttpHeaders responseHeaders = new HttpHeaders();
        User user = userRepository.getByUserID(argUser.getUserID());

        List<Post> postsWithImages = postRepository.findAllByUserAndImagePathNotNull(user);
        for (Post post : postsWithImages) {
            String path = "userImages/" + post.getImagePath().substring(post.getImagePath().lastIndexOf('/') + 1);
            File toDelete = new File(path);
            if (toDelete.exists()) {
                System.out.println(pColor("FILE EXISTS: " + toDelete.getName()));
                //FileUtils.forceDelete(toDelete);
            }
            if (toDelete.delete()) {
                System.out.println(pColor("FILE DELETED: " + toDelete.getName()));
            } else {
                System.out.println(pColor("ERROR COULD NOT DELETE: " + toDelete.getName()));
            }
        }
        userRepository.delete(user);
        return ResponseEntity.ok().headers(responseHeaders).body(user.getUserID());
    }


}





















