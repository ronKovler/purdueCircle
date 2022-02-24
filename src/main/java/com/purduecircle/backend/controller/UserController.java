package com.purduecircle.backend.controller;

import com.purduecircle.backend.repository.*;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.purduecircle.backend.models.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;

import java.net.URISyntaxException;

@RestController
@RequestMapping("/api/user/")
public class UserController {

    @Autowired  // Autowired annotation automatically injects an instance
    private UserRepository userRepository;
    @Autowired
    private TopicRepository topicRepository;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private TopicFollowerRepository topicFollowerRepository;
    @Autowired
    private UserFollowerRepository userFollowerRepository;
    @Autowired
    private ReactionRepository reactionRepository;

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
    public ResponseEntity<Integer> createAccount(@RequestBody User newUser) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();

        // Ensure email is not already in use
        User checkExists = userRepository.findByEmailEquals(newUser.getEmail());
        if (checkExists != null) {
            System.out.println("Email already used: " + checkExists.getEmail());
            return ResponseEntity.ok().headers(responseHeaders).body(-1);
        }

        // Ensure username is not already in use
        checkExists = null;
        checkExists = userRepository.findByUsername(newUser.getUsername());
        if (checkExists != null) {
            System.out.println("Username already used: " + checkExists.getUsername());
            return ResponseEntity.ok().headers(responseHeaders).body(-1);
        }

        // Ensure username is all lowercase
        newUser.setUsername(newUser.getUsername().toLowerCase());
        // Saves user to database
        userRepository.save(newUser);

        return ResponseEntity.ok().headers(responseHeaders).body(newUser.getUserID());
    }

    @CrossOrigin
    @RequestMapping(value="follow_topic", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> followTopic(@RequestBody User argUser, String topicStr) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();
        // Find actual user and topic in database
        User user = userRepository.findByUserID(argUser.getUserID());
        Topic topic = topicRepository.findByTopicName(topicStr);
        if (topic == null) {
            // Adds topic to database
            topic = new Topic(topicStr);
        }
        TopicFollower newTopicFollower = new TopicFollower(user, topic);
        topicFollowerRepository.save(newTopicFollower);
        user.addFollowedTopic(newTopicFollower);
        return ResponseEntity.ok().headers(responseHeaders).body(user.getUserID());
    }

    @CrossOrigin
    @RequestMapping(value="unfollow_topic", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> unfollowTopic(@RequestBody User argUser, String topicStr) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();
        // Find actual user and topic in database
        User user = userRepository.findByUserID(argUser.getUserID());
        Topic topic = topicRepository.findByTopicName(topicStr);
        // Remove from user list to be safe for now
        user.removeFollowedTopic(topicFollowerRepository.findByFollowerAndTopic(user, topic));
        // Remove from table
        topicFollowerRepository.deleteByFollowerAndTopic(user, topic);
        return ResponseEntity.ok().headers(responseHeaders).body(user.getUserID());
    }

    @CrossOrigin
    @RequestMapping(value="follow_user", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> followUser(@RequestBody User argUser, User argUserToFollow) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();
        User userThatsFollowing = userRepository.findByUserID(argUser.getUserID());
        User userToFollow = userRepository.findByUserID(argUserToFollow.getUserID());

        UserFollower userFollower = new UserFollower(userToFollow, userThatsFollowing);
        userFollowerRepository.save(userFollower);
        userToFollow.addFollower(userFollower);
        userThatsFollowing.addFollowing(userFollower);
        return ResponseEntity.ok().headers(responseHeaders).body(userThatsFollowing.getUserID());
    }

    @CrossOrigin
    @RequestMapping(value="unfollow_user", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> unfollowUser(@RequestBody User argUser, User argUserToUnfollow) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();
        User userThatsFollowing = userRepository.findByUserID(argUser.getUserID());
        User userToUnfollow = userRepository.findByUserID(argUserToUnfollow.getUserID());

        UserFollower userFollower = userFollowerRepository.findByUserAndFollower(userToUnfollow, userThatsFollowing);
        // remove from following
        userThatsFollowing.removeFollowing(userFollower);
        // remove from followers
        userToUnfollow.removeFollower(userFollower);
        // remove from table
        userFollowerRepository.deleteByUserAndFollower(userToUnfollow, userThatsFollowing);
        return ResponseEntity.ok().headers(responseHeaders).body(userThatsFollowing.getUserID());
    }

    @CrossOrigin
    @RequestMapping(value="like_post", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> likePost(@RequestBody ReactionDTO reactionDTO) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();
        User user = userRepository.findByUserID(reactionDTO.getUserID());
        Post post = postRepository.findByPostID(reactionDTO.getPostID());
        Reaction newReaction = new Reaction(0, user, post);
        post.addReaction(newReaction);
        int numReactions = post.getReactions().size();
        return ResponseEntity.ok().headers(responseHeaders).body(numReactions);
    }

    @CrossOrigin
    @RequestMapping(value="unlike_post", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> unlikePost(@RequestBody ReactionDTO reactionDTO) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();
        User user = userRepository.findByUserID(reactionDTO.getUserID());
        Post post = postRepository.findByPostID(reactionDTO.getPostID());
        Reaction reaction = reactionRepository.getReactionByPostAndUser(post, user);
        post.removeReaction(reaction);
        reactionRepository.delete(reaction);
        int numReactions = post.getReactions().size();
        return ResponseEntity.ok().headers(responseHeaders).body(numReactions);
    }

    @CrossOrigin
    @RequestMapping(value="hot_timeline", method = RequestMethod.GET,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<PostDTO>> showHotTimeline() throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();
        Timestamp yesterday = Timestamp.from(Instant.now().minus(24, ChronoUnit.HOURS));

        List<Post> topPosts = postRepository.findByTimePostedGreaterThanEqualOrderByTimePostedDesc(yesterday);
        List<PostDTO> topPostsDTO = new ArrayList<PostDTO>();
        for (Post post : topPosts) {
            PostDTO temp = new PostDTO(post);
            topPostsDTO.add(temp);
        }
        return ResponseEntity.ok().headers(responseHeaders).body(topPostsDTO);
    }
}
