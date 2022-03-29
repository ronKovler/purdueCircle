package com.purduecircle.backend.controller;

import com.purduecircle.backend.repository.*;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
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
//@CrossOrigin("www.purduecircle.me")
@CrossOrigin
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

    public static final String ANSI_RESET = "\u001B[0m";

    public static final String ANSI_YELLOW = "\u001B[33m";

    public String pColor(String text) {
        return ANSI_YELLOW + text + ANSI_RESET;
    }
    //purduecircle.me:8443/api/user/search?{num}
    @RequestMapping(path="{id}")
    public void home(@PathVariable("id") int ID) {
        System.out.println("Id received: " + ID);
        User user = userRepository.getByUserID(ID);
        System.out.println(pColor("User found by \"getByUserID(int)\": " + user.getUsername()));
        List<UserFollower> userFollowerList = userFollowerRepository.findAllByUser(user);
        for (int i = 0; i < userFollowerList.size(); i++) {
            System.out.println("FOLLOWER " + i + " : " + userFollowerList.get(i).getFollower().getUsername());
        }

    }

    /**
    /* Returns false if username or password is already taken, otherwise saves information
    /* to database and returns true
    */

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

    @RequestMapping(value="follow_topic", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> followTopic(@RequestBody User argUser, String topicStr) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();
        // Find actual user and topic in database
        User user = userRepository.getByUserID(argUser.getUserID());
        Topic topic = topicRepository.findByTopicName(topicStr);
        if (topic == null) {
            // Adds topic to database
            topic = new Topic(topicStr.toLowerCase());
        }
        TopicFollower newTopicFollower = new TopicFollower(user, topic);
        topicFollowerRepository.save(newTopicFollower);
        user.addFollowedTopic(newTopicFollower);
        return ResponseEntity.ok().headers(responseHeaders).body(user.getUserID());
    }

    @Transactional
    @RequestMapping(value="unfollow_topic/{userID}/{topicName}", method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> unfollowTopic(@PathVariable("userID") int argUser,
                                                 @PathVariable("topicName") String topicStr) throws URISyntaxException {
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


    @RequestMapping(value="follow_user/{userID}/{userToFollow}", method = RequestMethod.GET,
             produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> followUser(@PathVariable("userID") int argUserID,
                                              @PathVariable("userToFollow") int argUserToFollowID) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();
        User userThatsFollowing = userRepository.findByUserID(argUser.getUserID());
        User userToFollow = userRepository.findByUserID(argUserToFollow.getUserID());

        UserFollower userFollower = new UserFollower(userToFollow, userThatsFollowing);
        userFollowerRepository.save(userFollower);
        userToFollow.addFollower(userFollower);
        userThatsFollowing.addFollowing(userFollower);
        return ResponseEntity.ok().headers(responseHeaders).body(userThatsFollowing.getUserID());
    }

    @Transactional
    @RequestMapping(value="unfollow_user/{userID}/{userToUnfollow}", method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> unfollowUser(@PathVariable("userID") int argUser,
                                                @PathVariable("userToUnfollow") int argUserToUnfollow) throws URISyntaxException {
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

    @RequestMapping(value="like_post", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> likePost(@RequestBody ReactionDTO reactionDTO) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();
        User user = userRepository.getByUserID(reactionDTO.getUserID());
        Post post = postRepository.findByPostID(reactionDTO.getPostID());
        Reaction newReaction = new Reaction(0, user, post);
        post.addReaction(newReaction);
        reactionRepository.save(newReaction);
        int numReactions = post.getReactions().size();
        return ResponseEntity.ok().headers(responseHeaders).body(numReactions);
    }

    @RequestMapping(value="unlike_post", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> unlikePost(@RequestBody ReactionDTO reactionDTO) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();
        User user = userRepository.getByUserID(reactionDTO.getUserID());
        Post post = postRepository.findByPostID(reactionDTO.getPostID());
        Reaction reaction = reactionRepository.getReactionByPostAndUser(post, user);
        post.removeReaction(reaction);
        reactionRepository.delete(reaction);
        int numReactions = post.getReactions().size();
        return ResponseEntity.ok().headers(responseHeaders).body(numReactions);
    }

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



    // Homepage, all the topics and users a user follows
    @RequestMapping(value="get_user_timeline/{userID}", method = RequestMethod.GET,
             produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<PostDTO>> showUserTimeline(@PathVariable int userID) {
        User getTimelineUser = userRepository.getByUserID(userID);
        List<TopicFollower> tpfList = topicFollowerRepository.findAllByFollower(getTimelineUser);

        //adds all posts from topics following
        List<Topic> topicList = new ArrayList<>();
        List<Post> tempPosts = new ArrayList<>();
        for (TopicFollower tf : tpfList) {
            topicList.add(tf.getTopic());
            List<Post> topicPosts = postRepository.findAllByTopic(tf.getTopic());
            tempPosts.addAll(topicPosts);
        }

        //adds all posts from people user is following
        List<UserFollower> ufList = userFollowerRepository.findAllByFollower(getTimelineUser);
        for (UserFollower uf : ufList) {
            List<Post> followingUsersPosts = postRepository.findAllByUser(uf.getUser());
            tempPosts.addAll(followingUsersPosts);
        }

        Collections.sort(tempPosts);
        List<PostDTO> userTimelinePosts = new ArrayList<>();
        for (Post post : tempPosts) {
            userTimelinePosts.add(new PostDTO(post));
        }

        return ResponseEntity.ok().headers(new HttpHeaders()).body(userTimelinePosts);
    }

    // 0 = search for username, 1 = search for topic
    @RequestMapping(value="search/{type}/{search}", method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<SearchDTO>> getSearchResults(@PathVariable("type") int type, @PathVariable("search") String search) {

        List<String> results = new ArrayList<>();
        List<SearchDTO> searchResults = new ArrayList<>();
        if (type == 0) {
            // search for users
            List<User> usersFound = userRepository.findAllByUsernameStartingWith(search.toLowerCase());
            for (User user : usersFound) {
                searchResults.add(new SearchDTO(user.getUsername(), user.getUserID()));
            }

        }

        if (type == 1) {
            //search for topics
            List<Topic> topicsFound = topicRepository.findAllByTopicNameStartingWith(search.toLowerCase());
            for (Topic topic : topicsFound) {
                searchResults.add(new SearchDTO(topic.getTopicName()));
            }
//            for (String result : results) {
//                searchResults.add(new SearchDTO(result));
//            }
        }


        return ResponseEntity.ok().headers(new HttpHeaders()).body(searchResults);
    }
    // all the users posts, chronologically
    @RequestMapping(value="get_userline/{userID}", method = RequestMethod.GET
            , produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<PostDTO>> getUserline(@PathVariable("userID") int userID) {
        User user = userRepository.findByUserID(userID);
        if (user == null) {
            return ResponseEntity.badRequest().body(null);
        }

        List<Post> usersPosts = postRepository.findAllByUser(user);
        Collections.sort(usersPosts);
        Collections.reverse(usersPosts);

        List<PostDTO> usersPostDTOs = new ArrayList<>();
        for (Post post : usersPosts) {
            usersPostDTOs.add(new PostDTO(post));
        }

        return ResponseEntity.ok().body(usersPostDTOs);
    }

    // Get all posts under topic
    @RequestMapping(value="get_topic_page/{topicName}", method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<PostDTO>> getTopicPage(@PathVariable("topicName") String topicName) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();

        Topic topic = topicRepository.findByTopicName(topicName);
        List<Post> topicPosts = postRepository.findAllByTopic(topic);

        List<PostDTO> topicPostsDTOs = new ArrayList<>();
        for (Post post : topicPosts) {
            topicPostsDTOs.add(new PostDTO(post));
        }

        return ResponseEntity.ok().headers(responseHeaders).body(topicPostsDTOs);
    }

    // Get all saved posts from user
    @RequestMapping(value="get_saved_posts_line/{userID}", method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<PostDTO>> getSavedPostLine(@PathVariable("userID") int userID) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();

        User user = userRepository.getByUserID(userID);
        List<SavedPost> savePostObjs = savedPostsRepository.findAllByUser(user);

        List<Post> savePostPostObjs = new ArrayList<>();
        for (SavedPost post : savePostObjs) {
            savePostPostObjs.add(postRepository.findByPostID(post.getSavedPostID()));
        }
        
        List<PostDTO> savedPostsDTOs = new ArrayList<>();
        for (Post post : savePostPostObjs) {
            savedPostsDTOs.add(new PostDTO(post));
        }

        return ResponseEntity.ok().headers(responseHeaders).body(savedPostsDTOs);
    }

    @RequestMapping(value="get_user/{userID}", method = RequestMethod.GET,
             produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserDTO> getUser(@PathVariable int userID) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();
        System.out.println("\t\t\tUSER ID RECIEVED: " + userID);
        User user = userRepository.getByUserID(userID);

        System.out.println("GET USER REQUEST FOUND: " + user.getUsername());
        return ResponseEntity.ok().headers(responseHeaders).body(new UserDTO(user));
    }

    @RequestMapping(value="get_user_following/{userID}", method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<UserDTO>> getUserFollowingList(@PathVariable int userID) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();
        System.out.println("\t\t\tUSER ID RECIEVED: " + userID);
        User user = userRepository.getByUserID(userID);

        System.out.println("GET USER FOLLOWING REQUEST FOUND: " + user.getUsername());
        List<UserFollower> userFollowingList = userFollowerRepository.findAllByFollower(user); //MIGHT HAVE TO BE USER INSTEAD OF FOLLOWER
        List<UserDTO> userFollowingListDTO = new ArrayList<>();
        for (UserFollower userFollower : userFollowingList) {
            userFollowingListDTO.add(new UserDTO(userFollower.getUser()));
        }
        return ResponseEntity.ok().headers(responseHeaders).body(userFollowingListDTO);
    }

    @RequestMapping(value="get_user_topic_following/{userID}", method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ContentDTO>> getUserTopicFollowingList(@PathVariable int userID) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();
        System.out.println("\t\t\tUSER ID RECIEVED: " + userID);
        User user = userRepository.getByUserID(userID);

        System.out.println("GET USER FOLLOWING REQUEST FOUND: " + user.getUsername());
        List<TopicFollower> userTopicFollowingList = topicFollowerRepository.findAllByFollower(user); //MIGHT HAVE TO BE USER INSTEAD OF FOLLOWER
        List<ContentDTO> userTopicFollowingListResults = new ArrayList<>();
        for (TopicFollower topicFollower : userTopicFollowingList) {
            userTopicFollowingListResults.add(new ContentDTO(topicFollower.getTopic().getTopicName()));
        }
        return ResponseEntity.ok().headers(responseHeaders).body(userTopicFollowingListResults);
    }

}
