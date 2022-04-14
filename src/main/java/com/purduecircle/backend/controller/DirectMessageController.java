package com.purduecircle.backend.controller;

import com.purduecircle.backend.models.*;
import com.purduecircle.backend.repository.DirectMessageRepository;
import com.purduecircle.backend.repository.UserBlockedRepository;
import com.purduecircle.backend.repository.UserFollowerRepository;
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

@RequestMapping("/api/dm/")
public class DirectMessageController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private DirectMessageRepository directMessageRepository;
    @Autowired
    private UserBlockedRepository userBlockedRepository;
    @Autowired
    private UserFollowerRepository userFollowerRepository;

    @RequestMapping(value="send_msg", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> tryLogin(@RequestBody DirectMessageDTO directMessageDTO) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();

        User fromUser = userRepository.findByUserID(directMessageDTO.getFromUser());
        User toUser = userRepository.findByUserID(directMessageDTO.getToUser());

        UserBlocked foundUserBlocked = userBlockedRepository.findByUserAndBlockedUser(fromUser, toUser);
        if (foundUserBlocked != null) {
            // Sender has receiver blocked
            return ResponseEntity.ok().headers(responseHeaders).body(-1);
        }

        foundUserBlocked = userBlockedRepository.findByUserAndBlockedUser(toUser, fromUser);
        if (foundUserBlocked != null) {
            // Receiver has sender blocked
            return ResponseEntity.ok().headers(responseHeaders).body(-1);
        }

        if (toUser.isRestricted()) {
            // Only accepts messages from those receiver is following
            UserFollower foundUserFollower = userFollowerRepository.findByUserAndFollower(toUser, fromUser);
            if (foundUserFollower == null) {
                // Receiver not following sender, don't send message
                return ResponseEntity.ok().headers(responseHeaders).body(-1);
            }
        }

        DirectMessage newDM = new DirectMessage(fromUser, toUser, directMessageDTO.getContent());
        directMessageRepository.save(newDM);

        // Send -1 if sender has receiver blocked or receiver has sender blocked; otherwise ID of sender
        return ResponseEntity.ok().headers(responseHeaders).body(fromUser.getUserID());
    }

    // TODO - how to receive DMs
}