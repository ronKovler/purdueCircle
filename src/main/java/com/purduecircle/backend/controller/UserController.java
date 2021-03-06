package com.purduecircle.backend.controller;

import com.purduecircle.backend.repository.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import com.purduecircle.backend.models.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;

import java.net.URISyntaxException;

/**
 * A spring MVC for most user based operations for purduecircle
 * @author Ron Kovler, Jesse Majors, Nicholas Fang, Nick Gorki, Ryan Lechner
 */

/*
PAGES
hot_timeline: posts made in the past 24 hrs
user_timeline: all topics and users that the user follows (homepage)
get_userline/{userID}: all the users posts, chronologically
get_saved_posts_line: posts saved by user
reacted_to_line: TODO posts the user has reacted to
get_topic_page: posts under designated topic

HELPERS
search/{type}: search for username (0), search by topic (1)
get_user: return user object based on userID
create_account: receives information and creates account if valid
follow_topic: received user follows received topic
unfollow_topic: received user unfollows received topic
follow_user: received user follows other received user
unfollow_user: received user unfollows other received user
like_post: received user follows received post
unlike_post: received user unfollows received post
TODO save and unsave post functions
 */

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
    @Autowired
    private SavedPostRepository savedPostRepository;
    @Autowired
    private UserBlockedRepository userBlockedRepository;
    @Autowired
    private CommentRepository commentRepository;

    public static final String ANSI_RESET = "\u001B[0m";

    public static final String ANSI_YELLOW = "\u001B[33m";

    public String pColor(String text) {
        return ANSI_YELLOW + text + ANSI_RESET;
    }

    public PostDTO createPostDTO(int postID, int userID) {
        Post getPost = postRepository.findByPostID(postID);
        User getUser = userRepository.findByUserID(userID);

        int reactionType = -1;
        boolean topicFollowed = false;
        boolean userFollowed = false;
        boolean isSaved = false;
        List<CommentDTO> comments;

        if (getUser != null) {
            Reaction reaction = reactionRepository.getReactionByPostAndUser(getPost, getUser);
            if (reaction != null) {
                reactionType = reaction.getReactionType();
            }

            TopicFollower topicFollower = topicFollowerRepository.findByFollowerAndTopic(getUser, getPost.getTopic());
            if (topicFollower != null) {
                topicFollowed = true;
            }

            UserFollower userFollower = userFollowerRepository.findByUserAndFollower(getPost.getUser(), getUser);
            if (userFollower != null) {
                userFollowed = true;
            }

            SavedPost savedPost = savedPostRepository.findByUserAndSavedPost(getUser, getPost);
            if (savedPost != null) {
                isSaved = true;
            }

            comments = commentRepository.getAllPostCommentsWithoutBlocked(getPost, getUser);

        } else {
            comments = commentRepository.getAllPostComments(getPost);
        }

        User postUser = getPost.getUser();
        String path = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Farchive.org%2Fdownload%2Ftwitter-" +
                "default-pfp%2Fe.png&f=1&nofb=1";
        if (!getPost.isAnonymous()) {
            path = postUser.getProfileImagePath();
        }

        PostDTO postDTO = new PostDTO(getPost, reactionType, topicFollowed, userFollowed, isSaved,
                comments, path);
        //System.out.println("\t\t\tPOST reactiontype: "  );
        return postDTO;
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

    @RequestMapping(value="follow_topic/{userID}/{topicName}", method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> followTopic(@PathVariable("userID") int argUser,
                                               @PathVariable("topicName") String topicStr) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();
        // Find actual user and topic in database
        User user = userRepository.getByUserID(argUser);
        Topic topic = topicRepository.findByTopicName(topicStr);

        TopicFollower foundTopicFollower = topicFollowerRepository.findByFollowerAndTopic(user, topic);
        if (foundTopicFollower != null) {
            // Already following topic
            return ResponseEntity.ok().headers(responseHeaders).body(user.getUserID());
        }

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
        User user = userRepository.findByUserID(argUser);
        Topic topic = topicRepository.findByTopicName(topicStr);

        TopicFollower foundTopicFollower = topicFollowerRepository.findByFollowerAndTopic(user, topic);
        if (foundTopicFollower == null) {
            // Already not following topic
            return ResponseEntity.ok().headers(responseHeaders).body(user.getUserID());
        }

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
        User userThatsFollowing = userRepository.findByUserID(argUserID);
        User userToFollow = userRepository.findByUserID(argUserToFollowID);

        UserFollower foundUserFollower = userFollowerRepository.findByUserAndFollower(userThatsFollowing, userToFollow);
        if (foundUserFollower != null) {
            // Already following
            return ResponseEntity.ok().headers(responseHeaders).body(userThatsFollowing.getUserID());
        }

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
        User userThatsFollowing = userRepository.findByUserID(argUser);
        User userToUnfollow = userRepository.findByUserID(argUserToUnfollow);

        UserFollower foundUserFollower = userFollowerRepository.findByUserAndFollower(userThatsFollowing, userToUnfollow);
        if (foundUserFollower != null) {
            // Already not following
            return ResponseEntity.ok().headers(responseHeaders).body(userThatsFollowing.getUserID());
        }

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

        // Check if reaction exists
        Reaction foundReaction = reactionRepository.getReactionByPostAndUser(post, user);
        if (foundReaction != null) {
            if (foundReaction.getReactionType() == 0) {
                // already liked
                return ResponseEntity.ok().headers(responseHeaders).body(post.getNetReactions());
            }
            // Already disliked, undislike first
            foundReaction.setTimeReacted(new Timestamp(System.currentTimeMillis()));
            foundReaction.setReactionType(0);
            reactionRepository.save(foundReaction);
        } else {
            Reaction newReaction = new Reaction(0, user, post);
            post.addReaction(newReaction);
            reactionRepository.save(newReaction);
        }
        return ResponseEntity.ok().headers(responseHeaders).body(post.getNetReactions());
    }

    @RequestMapping(value="unlike_post", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> unlikePost(@RequestBody ReactionDTO reactionDTO) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();
        User user = userRepository.getByUserID(reactionDTO.getUserID());
        Post post = postRepository.findByPostID(reactionDTO.getPostID());

        Reaction foundReaction = reactionRepository.getReactionByPostAndUser(post, user);
        if (foundReaction == null) {
            // Already unliked
            return ResponseEntity.ok().headers(responseHeaders).body(post.getNetReactions());
        }
        post.removeReaction(foundReaction);
        reactionRepository.delete(foundReaction);
        return ResponseEntity.ok().headers(responseHeaders).body(post.getNetReactions());
    }

    @RequestMapping(value="dislike_post", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> dislikePost(@RequestBody ReactionDTO reactionDTO) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();
        User user = userRepository.getByUserID(reactionDTO.getUserID());
        Post post = postRepository.findByPostID(reactionDTO.getPostID());

        // Check if reaction exists
        Reaction foundReaction = reactionRepository.getReactionByPostAndUser(post, user);
        if (foundReaction != null) {
            if (foundReaction.getReactionType() == 1) {
                // already disliked
                return ResponseEntity.ok().headers(responseHeaders).body(post.getNetReactions());
            }
            // Already liked, unlike first
            foundReaction.setTimeReacted(new Timestamp(System.currentTimeMillis()));
            foundReaction.setReactionType(1);
            reactionRepository.save(foundReaction);
        } else {
            Reaction newReaction = new Reaction(1, user, post);
            post.addReaction(newReaction);
            reactionRepository.save(newReaction);
        }
        return ResponseEntity.ok().headers(responseHeaders).body(post.getNetReactions());
    }

    @RequestMapping(value="undislike_post", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> undislikePost(@RequestBody ReactionDTO reactionDTO) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();
        User user = userRepository.getByUserID(reactionDTO.getUserID());
        Post post = postRepository.findByPostID(reactionDTO.getPostID());

        Reaction foundReaction = reactionRepository.getReactionByPostAndUser(post, user);
        if (foundReaction == null) {
            // Already undisliked
            return ResponseEntity.ok().headers(responseHeaders).body(post.getNetReactions());
        }
        post.removeReaction(foundReaction);
        reactionRepository.delete(foundReaction);
        return ResponseEntity.ok().headers(responseHeaders).body(post.getNetReactions());
    }

    @RequestMapping(value="block_user/{userID}/{userToBlock}", method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> blockUser(@PathVariable("userID") int argUserID,
                                              @PathVariable("userToBlock") int argUserToBlock) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();
        User userThatsBlocking = userRepository.findByUserID(argUserID);
        User userToBlock = userRepository.findByUserID(argUserToBlock);

        UserBlocked foundUserBlocked = userBlockedRepository.findByUserAndBlockedUser(userThatsBlocking, userToBlock);
        if (foundUserBlocked != null) {
            // Already blocked
            return ResponseEntity.ok().headers(responseHeaders).body(-1);
        }

        UserBlocked newUserBlocked = new UserBlocked(userThatsBlocking, userToBlock);
        userBlockedRepository.save(newUserBlocked);
        userThatsBlocking.addBlockedUser(newUserBlocked);
        return ResponseEntity.ok().headers(responseHeaders).body(userThatsBlocking.getUserID());
    }

    @Transactional
    @RequestMapping(value="unblock_user/{userID}/{userToUnblock}", method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> unblockUser(@PathVariable("userID") int argUserID,
                                                @PathVariable("userToUnblock") int argUserToUnblock) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();
        User userThatsUnblocking = userRepository.findByUserID(argUserID);
        User userToUnblock = userRepository.findByUserID(argUserToUnblock);

        UserBlocked foundUserBlocked = userBlockedRepository.findByUserAndBlockedUser(userThatsUnblocking, userToUnblock);
        if (foundUserBlocked == null) {
            // Already unblocked
            return ResponseEntity.ok().headers(responseHeaders).body(-1);
        }

        // remove from blocked list
        userThatsUnblocking.removeBlockedUser(foundUserBlocked);
        // remove from table
        userBlockedRepository.deleteByUserAndBlockedUser(userThatsUnblocking, userToUnblock);
        return ResponseEntity.ok().headers(responseHeaders).body(userThatsUnblocking.getUserID());
    }

    @RequestMapping(value="unsave_post", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> unsavePost(@RequestBody SavedPostDTO savedPostDTO) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();
        User user = userRepository.getByUserID(savedPostDTO.getUserID());
        Post post = postRepository.findByPostID(savedPostDTO.getPostID());

        SavedPost foundSavedPost = savedPostRepository.findByUserAndSavedPost(user, post);
        if (foundSavedPost == null) {
            // post already not saved
            return ResponseEntity.ok().headers(responseHeaders).body(user.getUserID());
        }
        savedPostRepository.delete(foundSavedPost);

        return ResponseEntity.ok().headers(responseHeaders).body(user.getUserID());
    }

    @RequestMapping(value="save_post", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> savePost(@RequestBody SavedPostDTO savedPostDTO) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();
        User user = userRepository.getByUserID(savedPostDTO.getUserID());
        Post post = postRepository.findByPostID(savedPostDTO.getPostID());
        if (user == null || post == null) {
            return ResponseEntity.badRequest().body(-1);
        }
        SavedPost savedPost = new SavedPost(user, post);

        savedPostRepository.save(savedPost);

        return ResponseEntity.ok().headers(responseHeaders).body(user.getUserID());
    }

    // Posts made in the past 24 hrs
    @RequestMapping(value="hot_timeline/{userID}", method = RequestMethod.GET,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<PostDTO>> showHotTimeline(@PathVariable("userID") int userID) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();
        Timestamp yesterday = Timestamp.from(Instant.now().minus(24, ChronoUnit.HOURS));

        User user = userRepository.findByUserID(userID);
        List<Post> topPosts;
        if (user != null) {
            topPosts = postRepository.getHotTimeline(user, yesterday);
        } else {
            topPosts = postRepository.findByTimePostedGreaterThanEqualOrderByTimePostedDesc(yesterday);
        }

        List<PostDTO> topPostsDTO = new ArrayList<PostDTO>();
        for (Post post : topPosts) {
            PostDTO temp = createPostDTO(post.getPostID(), userID);
            topPostsDTO.add(temp);
        }
        return ResponseEntity.ok().headers(responseHeaders).body(topPostsDTO);
    }

    // Posts that have been liked/dislike
    @RequestMapping(value="get_reacted_to_posts/{userID}", method = RequestMethod.GET,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<PostDTO>> showReactedToPosts(@PathVariable int userID) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();

        User user = userRepository.getByUserID(userID);
        // Find all reactions from user
        List<Reaction> userReactions = reactionRepository.getReactionsByUser(user);
        // Find all posts with reactions from user
        List<Post> reactionPosts = new ArrayList<>();
        for (Reaction currReaction : userReactions) {
            reactionPosts.add(currReaction.getPost());
        }

        List<PostDTO> reactionPostsDTO = new ArrayList<PostDTO>();
        for (Post post : reactionPosts) {
            PostDTO temp = createPostDTO(post.getPostID(), userID);
            reactionPostsDTO.add(temp);
        }
        return ResponseEntity.ok().headers(responseHeaders).body(reactionPostsDTO);
    }

    // Homepage, all the topics and users a user follows
    @RequestMapping(value="get_user_timeline/{userID}", method = RequestMethod.GET,
             produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<PostDTO>> showUserTimeline(@PathVariable int userID) {
        User getTimelineUser = userRepository.getByUserID(userID);
        List<Post> tempPosts = new ArrayList<>();
//----------------------------------------Old Way of generating suer timeline ------------------------------------
//        List<TopicFollower> tpfList = topicFollowerRepository.findAllByFollower(getTimelineUser);
//
//        //adds all posts from topics following
//        List<Topic> topicList = new ArrayList<>();
//
//        Set<Post> tempPostsCheckDuplicates = new HashSet<>();
//        for (TopicFollower tf : tpfList) {
//            topicList.add(tf.getTopic());
//            List<Post> topicPosts = postRepository.findAllByTopic(tf.getTopic());
//            //tempPosts.addAll(topicPosts);
//            tempPostsCheckDuplicates.addAll(topicPosts);
//        }
//
//        //adds all posts from people user is following
//        List<UserFollower> ufList = userFollowerRepository.findAllByFollower(getTimelineUser);
//        for (UserFollower uf : ufList) {
//            List<Post> followingUsersPosts = postRepository.findAllByUser(uf.getUser());
//            //tempPosts.addAll(followingUsersPosts);
//            tempPostsCheckDuplicates.addAll(followingUsersPosts);
//        }
//        //tempPosts.addAll(postRepository.findAllByUser(getTimelineUser));
//        tempPostsCheckDuplicates.addAll(postRepository.findAllByUser(getTimelineUser));
//
//        tempPosts.addAll(tempPostsCheckDuplicates);
//-------------------------------------------------------------------------------------------------------------------
        /**New way of generating user time line with blocked incorporated*/
        tempPosts = postRepository.findAllUserTimelinePosts(getTimelineUser);
        Collections.sort(tempPosts);
        Collections.reverse(tempPosts);
        List<PostDTO> userTimelinePosts = new ArrayList<>();
        for (Post post : tempPosts) {
            userTimelinePosts.add(createPostDTO(post.getPostID(), userID));
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
        }


        return ResponseEntity.ok().headers(new HttpHeaders()).body(searchResults);
    }
    // all the users posts, chronologically
    @RequestMapping(value="get_userline/{userID}/{viewingUserID}", method = RequestMethod.GET
            , produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<PostDTO>> getUserline(@PathVariable("userID") int userID,
                                                     @PathVariable("viewingUserID") int viewingUserID) {
        User user = userRepository.findByUserID(userID);
        User viewingUser = userRepository.findByUserID(viewingUserID);
        List<Post> usersPosts;
        List<PostDTO> usersPostDTOs = new ArrayList<>();
        UserBlocked userBlocked = null;
        if (user == null ) {
            return ResponseEntity.badRequest().body(null);
        } else if (viewingUser != null) {
            userBlocked = userBlockedRepository.findByUserAndBlockedUser(user, viewingUser);

        }
        if (userBlocked == null) {
            //user is not blocked, show posts.
            usersPosts = postRepository.findAllByUser(user);
            Collections.sort(usersPosts);
            Collections.reverse(usersPosts);

            for (Post post : usersPosts) {
                if (!post.isAnonymous() || (userID == viewingUserID)) {
                    usersPostDTOs.add(createPostDTO(post.getPostID(), viewingUserID));
                }

            }
        }



        return ResponseEntity.ok().body(usersPostDTOs);
    }

    // Get all posts under topic
    @RequestMapping(value="get_topic_page/{topicName}/{userID}", method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<PostDTO>> getTopicPage(@PathVariable("topicName") String topicName,
                                                      @PathVariable("userID") int userID) throws URISyntaxException {

        HttpHeaders responseHeaders = new HttpHeaders();

        Topic topic = topicRepository.findByTopicName(topicName);
        List<Post> topicPosts = postRepository.findAllByTopic(topic);

        User user = userRepository.findByUserID(userID);
        List<Post> topicPostsWithoutBlocked = postRepository.findAllTopicPostsWithoutBlocked(topic, user);

        List<PostDTO> topicPostsDTOs = new ArrayList<>();
        for (Post post : topicPostsWithoutBlocked) {
            topicPostsDTOs.add(createPostDTO(post.getPostID(), userID));
        }

        return ResponseEntity.ok().headers(responseHeaders).body(topicPostsDTOs);
    }

    // Get all saved posts from user
    @RequestMapping(value="get_saved_posts_line/{userID}", method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<PostDTO>> getSavedPostLine(@PathVariable("userID") int userID) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();

        User user = userRepository.getByUserID(userID);
//        List<SavedPost> savePostObjs = savedPostRepository.findAllByUser(user);
//
//        List<Post> savePostPostObjs = new ArrayList<>();
//        for (SavedPost savedPost : savePostObjs) {
//            savePostPostObjs.add(savedPost.getSavedPost());
//        }
        List<Post> savedPosts = savedPostRepository.findUsersSavedPost(user);
        List<PostDTO> savedPostsDTOs = new ArrayList<>();
        for (Post post : savedPosts) {
            savedPostsDTOs.add(createPostDTO(post.getPostID(), userID));
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
