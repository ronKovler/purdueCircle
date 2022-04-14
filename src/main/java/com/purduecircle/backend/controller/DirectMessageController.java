package com.purduecircle.backend.controller;

import com.purduecircle.backend.models.User;
import com.purduecircle.backend.models.DirectMessage;
import com.purduecircle.backend.models.DirectMessageDTO;
import com.purduecircle.backend.repository.DirectMessageRepository;
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
    UserRepository userRepository;
    @Autowired
    DirectMessageRepository directMessageRepository;

    @RequestMapping(value="send_msg", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> tryLogin(@RequestBody DirectMessageDTO directMessageDTO) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();

        User fromUser = userRepository.findByUserID(directMessageDTO.getFromUser());
        User toUser = userRepository.findByUserID(directMessageDTO.getToUser());

        DirectMessage newDM = new DirectMessage(fromUser, toUser, directMessageDTO.getContent());
        directMessageRepository.save(newDM);

        return ResponseEntity.ok().headers(responseHeaders).body(-1);
    }

    // TODO - how to receive DMs
}