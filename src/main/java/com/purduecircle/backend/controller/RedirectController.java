package com.purduecircle.backend.controller;

import com.purduecircle.backend.models.Post;
import com.purduecircle.backend.models.PostDTO;
import com.purduecircle.backend.models.Topic;
import com.purduecircle.backend.models.User;
import com.purduecircle.backend.repository.PostRepository;
import com.purduecircle.backend.repository.TopicRepository;
import com.purduecircle.backend.repository.UserFollowerRepository;
import com.purduecircle.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

@RestController

public class RedirectController {

    @Autowired
    PostRepository postRepository;
    @Autowired
    UserFollowerRepository userFollowerRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    TopicRepository topicRepository;

//    @RequestMapping("/{userID}")
//    public ResponseEntity<List<Integer>> redirect(@PathVariable("userID") int userID) {
//        User user = userRepository.findByUserID(userID);
//        List<Integer> found = userFollowerRepository.findFollowingUserIDs(user);
//        return ResponseEntity.ok(found);
//    }
//
//    @RequestMapping("/{topic}/{userID}")
//    public ResponseEntity<List<PostDTO>> topic(@PathVariable("topic") String topic, @PathVariable("userID") int userID) {
//        User user = userRepository.findByUserID(userID);
//        Topic topic1 = topicRepository.findByTopicName(topic);
//        //List<Integer> found = userFollowerRepository.findFollowingUserIDs(user);
//        //List<Integer> blocked = new ArrayList<>(1);
//        //blocked.add(userID);
//        List<Post> list = postRepository.findAllTopicPostsWithoutBlocked(topic1, user);
//        List<PostDTO> finalList = new ArrayList<>();
//        for (Post post : list) {
//            finalList.add(new PostDTO(post));
//        }
//        return ResponseEntity.ok(finalList);
//    }
}
