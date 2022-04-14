package com.purduecircle.backend.controller;

import com.purduecircle.backend.models.*;
import com.purduecircle.backend.repository.*;
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
    @Autowired
    CommentRepository commentRepository;

//    @RequestMapping("/{userID}")
//    public ResponseEntity<List<Integer>> redirect(@PathVariable("userID") int userID) {
//        User user = userRepository.findByUserID(userID);
//        List<Integer> found = userFollowerRepository.findFollowingUserIDs(user);
//        return ResponseEntity.ok(found);
//    }

    @RequestMapping("/test/{userID}")
    public ResponseEntity<List<PostDTO>> topic(@PathVariable("userID") int userID) {
        User user = userRepository.findByUserID(userID);
        //Topic topic1 = topicRepository.findByTopicName(topic);
        //List<Integer> found = userFollowerRepository.findFollowingUserIDs(user);
        //List<Integer> blocked = new ArrayList<>(1);
        //blocked.add(userID);
        List<Post> list = postRepository.findAllUserTimelinePosts(user);
        List<PostDTO> finalList = new ArrayList<>();
        for (Post post : list) {
            finalList.add(new PostDTO(post));
        }
        return ResponseEntity.ok(finalList);
    }

    @RequestMapping("/testPost/{postID}")
    public ResponseEntity<List<CommentDTO>> comment(@PathVariable("postID") int postID) {
        Post post = postRepository.findByPostID(postID);
        User user = userRepository.findByUserID(1);
        List<CommentDTO> list = commentRepository.getAllPostCommentsWithoutBlocked(post, user);
        return ResponseEntity.ok(list);
    }
}
