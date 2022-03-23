package com.purduecircle.backend.controller;

import com.purduecircle.backend.repository.PostRepository;
import com.purduecircle.backend.repository.ReactionRepository;
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
@CrossOrigin("www.purduecircle.me")
public class PostController {

    /* Autowired annotation automatically injects an instance */
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private TopicRepository topicRepository;

    @Autowired
    private ReactionRepository reactionRepository;

    @RequestMapping(value="create_post", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> createPost(@RequestBody PostDTO postDTO) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();
        //DON'T TOUCH ABOVE
        System.out.println("\t\t\t CONTENT: \"" + postDTO.getContent() + "\"");
        System.out.println("\t\t\t USERID: " + postDTO.getUserId());
        User user = userRepository.getByUserID(postDTO.getUserId());
        String topicName = postDTO.getTopicName().toLowerCase();
        Topic topic = topicRepository.findByTopicName(postDTO.getTopicName());

        // If topic doesn't exist, create it
        if (topic == null) {
            topic = new Topic(postDTO.getTopicName());
            topicRepository.save(topic);
        }

        Post post = new Post(postDTO.getContent(), user, topic, postDTO.isAnonymous());
        System.out.println(postDTO.getContent());
        postRepository.save(post);
        return ResponseEntity.ok().headers(responseHeaders).body(post.getPostID());
    }

    @RequestMapping(value="get_post", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Post> getPost(@RequestBody PostDTO postDTO) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();
        //DON'T TOUCH ABOVE
        Post getPost = postRepository.findByPostID(postDTO.getPostId());

        return ResponseEntity.ok().headers(responseHeaders).body(getPost);
    }

    @RequestMapping(value="is_liked", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> checkUserPostLiked(@RequestBody ReactionDTO reactionDTO) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();
        //DON'T TOUCH ABOVE
        Post post = postRepository.findByPostID(reactionDTO.getPostID());
        User user = userRepository.findByUserID(reactionDTO.getUserID());
        Reaction reaction = reactionRepository.getReactionByPostAndUser(post, user);
        if (reaction == null) {
            return ResponseEntity.ok().headers(responseHeaders).body(false);
        }
        if (reaction.getReactionType() == 0) {
            return ResponseEntity.ok().headers(responseHeaders).body(true);
        }
        return ResponseEntity.ok().headers(responseHeaders).body(false);

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

    @RequestMapping(value="get_topicline", method = RequestMethod.GET,
            /*consumes = MediaType.APPLICATION_JSON_VALUE,*/ produces = MediaType.APPLICATION_JSON_VALUE)

    public ResponseEntity<List<PostDTO>> getTopicline (@RequestBody String topicName) {
        Topic topic = topicRepository.findByTopicName(topicName);
        List<Post> topicPosts = postRepository.findAllByTopic(topic);
        Collections.sort(topicPosts);
        List<PostDTO> topicPostDTOs = new ArrayList<>();
        for (Post post : topicPosts) {
            topicPostDTOs.add(new PostDTO(post));
        }

        return ResponseEntity.ok().headers(new HttpHeaders()).body(topicPostDTOs);
    }

}
