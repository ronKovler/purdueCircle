package com.purduecircle.backend.controller;

import com.purduecircle.backend.repository.PostRepository;
import com.purduecircle.backend.repository.TopicRepository;
import com.purduecircle.backend.repository.UserRepository;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import com.purduecircle.backend.models.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.net.URISyntaxException;

@RestController
@RequestMapping("/api/post/")
public class PostController {

    @Autowired  //Autowired annotation automatically injects an instance
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private TopicRepository topicRepository;

    @CrossOrigin
    @RequestMapping(value="create_post", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> tryLogin(@RequestBody PostDTO postDTO) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();
        //DON'T TOUCH ABOVE
        User user = userRepository.findByUserID(postDTO.getUserId());
        Topic topic = topicRepository.findByTopicName(postDTO.getTopicName());

        if (postDTO != null && topic == null) {
            topic = new Topic(postDTO.getTopicName());
            topicRepository.save(topic);
        }
        else if (postDTO == null) topic = topicRepository.findByTopicName("general");
        Post post = new Post(postDTO.getContent(), user, topic);

        postRepository.save(post);
        return ResponseEntity.ok().headers(responseHeaders).body(post.getPostID());
    }


}
