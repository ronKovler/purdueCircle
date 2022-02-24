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
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

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

        // If topic doesn't exist, create it
        if (topic == null) {
            topic = new Topic(postDTO.getTopicName());
            topicRepository.save(topic);
        }

        Post post = new Post(postDTO.getContent(), user, topic);
        System.out.println(postDTO.getContent());
        postRepository.save(post);
        return ResponseEntity.ok().headers(responseHeaders).body(post.getPostID());
    }

    @CrossOrigin
    @RequestMapping(value="get_post", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Post> getPost(@RequestBody PostDTO postDTO) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();
        //DON'T TOUCH ABOVE
        Post getPost = postRepository.findByPostID(postDTO.getPostId());

        return ResponseEntity.ok().headers(responseHeaders).body(getPost);
    }

    @CrossOrigin
    @RequestMapping(value="get_topics", method = RequestMethod.GET,
            /*consumes = MediaType.APPLICATION_JSON_VALUE,*/ produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<String>> getTopics() throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();
        //DON'T TOUCH ABOVE
        List<Topic> topicList = topicRepository.findAll();
        List<String> topicListString = new ArrayList<>();
        for (Topic topic : topicList) {
            topicListString.add(topic.getTopicName());
        }


        return ResponseEntity.ok().headers(responseHeaders).body(topicListString);
    }

}
