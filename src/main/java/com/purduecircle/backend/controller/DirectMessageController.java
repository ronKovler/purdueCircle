package com.purduecircle.backend.controller;

import com.purduecircle.backend.models.*;
import com.purduecircle.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
//import org.springframework.messaging.
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;


@Controller
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

    @Autowired private SimpMessagingTemplate simpMessagingTemplate;
    //@Autowired private ChatMessageService chatMessageService;
    //@Autowired private ChatRoomService chatRoomService;
    @Autowired
    ChatRoomRepository chatRoomRepository;



    @MessageMapping("/chat")
    public void processMessage(@Payload DirectMessageDTO directMessageDTO) {
        int senderID = directMessageDTO.getFromUserID();
        int recipientID = directMessageDTO.getToUserID();
        String chatID = chatRoomRepository.getChatID(senderID, recipientID);

        if (chatID == null) {
            //chat room doesnt exist, create it;

            chatID = String.format("%d_%d", senderID, recipientID);
            ChatRoom senderRecipient = new ChatRoom(senderID, recipientID, chatID);
            ChatRoom recipientSender = new ChatRoom(recipientID, senderID, chatID);
            chatRoomRepository.save(senderRecipient);
            chatRoomRepository.save(recipientSender);
        }
        User from = userRepository.findByUserID(senderID);
        User to = userRepository.findByUserID(recipientID);
        DirectMessage newMsg = new DirectMessage(from, to, directMessageDTO.getContent());
        newMsg.setChatID(chatID);

        directMessageRepository.save(newMsg);


        simpMessagingTemplate.convertAndSendToUser(
                String.valueOf(recipientID),"/queue/messages",
                directMessageDTO
        );
    }

    @SubscribeMapping("/user/{id}/queue/messages")
    @SendTo("/queue/messages")
    public void sendPreviousMessages(@DestinationVariable int id) {
        List<DirectMessageDTO> messages = directMessageRepository.getAllDirectMessagesByUser(userRepository.findByUserID(id));
        for (DirectMessageDTO directMessageDTO : messages) {
            simpMessagingTemplate.convertAndSendToUser(
                    String.valueOf(id),"/queue/messages",
                    directMessageDTO
            );
        }
        //return messages;
    }

    @RequestMapping(value="get_user_direct_messages/{currentUser}/{toUser}", method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<DirectMessageDTO>> getDirectMessages(@PathVariable("currentUser") int fromID,
                                                                    @PathVariable("toUser") int toID) {
        User current = userRepository.findByUserID(fromID);
        User to = userRepository.findByUserID(toID);
        List<DirectMessageDTO> dms = directMessageRepository.getAllMessagesBetweenUsers(current, to);

        HttpHeaders responseHeaders = new HttpHeaders();
        return ResponseEntity.ok().headers(responseHeaders).body(dms);
    }



    @RequestMapping(value="send_msg", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> tryLogin(@RequestBody DirectMessageDTO directMessageDTO) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();

        User fromUser = userRepository.findByUserID(directMessageDTO.getFromUserID());
        User toUser = userRepository.findByUserID(directMessageDTO.getToUserID());

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