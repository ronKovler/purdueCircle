package com.purduecircle.backend.controller;

import com.purduecircle.backend.repository.*;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import com.purduecircle.backend.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;


import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.*;
import java.util.*;



@RestController
@RequestMapping("/api/post/")
//@CrossOrigin("www.purduecircle.me")
@CrossOrigin
public class PostController {
    Object lock = new Object();

    /* Autowired annotation automatically injects an instance */
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private TopicRepository topicRepository;

    @Autowired
    private TopicFollowerRepository topicFollowerRepository;

    @Autowired
    private ReactionRepository reactionRepository;

    @Autowired
    private UserFollowerRepository userFollowerRepository;

    @Autowired
    private SavedPostRepository savedPostRepository;

    @Autowired
    private CommentRepository commentRepository;


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

        PostDTO postDTO = new PostDTO(getPost, reactionType, topicFollowed, userFollowed, isSaved, comments);
        //System.out.println("\t\t\tPOST reactiontype: "  );
        return postDTO;
    }


    @RequestMapping(value="create_post", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> createPost(@RequestBody PostDTO postDTO) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();
        //DON'T TOUCH ABOVE
        System.out.println("\t\t\t CONTENT: \"" + postDTO.getContent() + "\"");
        System.out.println("\t\t\t USERID: " + postDTO.getUserID());
        if (postDTO.getContent() == null || postDTO.getTopicName() == null) {
            return ResponseEntity.badRequest().body(-1);
        }
        User user = userRepository.getByUserID(postDTO.getUserID());
        String topicName = postDTO.getTopicName().toLowerCase();
        if (topicName.compareTo("") == 0) {
            topicName = "general";
        }
        Topic topic = topicRepository.findByTopicName(topicName);

        // If topic doesn't exist, create it
        if (topic == null) {
            topic = new Topic(topicName);
            topicRepository.save(topic);
        }

        Post post = new Post(postDTO.getContent(), user, topic, postDTO.isAnonymous());

        // If link isn't null, set; if image path isn't null, set
        if (postDTO.getLink() != null) {
            post.setLink(postDTO.getLink());
        }
        if (postDTO.getImagePath() != null) {
            post.setImagePath(postDTO.getImagePath());
        }

        postRepository.save(post);
        return ResponseEntity.ok().headers(responseHeaders).body(post.getPostID());
    }

    @RequestMapping(value="get_post/{postID}/{userID}", method = RequestMethod.GET,
             produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<PostDTO> getPost(@PathVariable("postID") int postID,
                                           @PathVariable("userID") int userID) throws URISyntaxException {

        HttpHeaders responseHeaders = new HttpHeaders();

        return ResponseEntity.ok().headers(responseHeaders).body(createPostDTO(postID, userID));
    }

    @RequestMapping(value="is_liked/{userID}/{postID}", method = RequestMethod.GET,
             produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> checkUserPostLiked(@PathVariable("userID") int userID, @PathVariable("postID") int postID) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();
        //DON'T TOUCH ABOVE
        Post post = postRepository.findByPostID(postID);
        User user = userRepository.findByUserID(userID);
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

//    @RequestMapping(value="get_topicline", method = RequestMethod.GET,
//            /*consumes = MediaType.APPLICATION_JSON_VALUE,*/ produces = MediaType.APPLICATION_JSON_VALUE)
//
//    public ResponseEntity<List<PostDTO>> getTopicline (@RequestBody String topicName) {
//        Topic topic = topicRepository.findByTopicName(topicName);
//        List<Post> topicPosts = postRepository.findAllByTopic(topic);
//        Collections.sort(topicPosts);
//        List<PostDTO> topicPostDTOs = new ArrayList<>();
//        for (Post post : topicPosts) {
//            topicPostDTOs.add(new PostDTO(post));
//        }
//        return ResponseEntity.ok().headers(new HttpHeaders()).body(topicPostDTOs);
//    }



    @RequestMapping(value="upload_image", method = RequestMethod.POST,
             produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ContentDTO> uploadToLocalFileSystem(@RequestParam("file") MultipartFile file) throws NullPointerException{
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        System.out.println("\t\t\t FILECONTENT TYPEEEEEEEE " +file.getContentType());
        System.out.println("\t\t\t FILE NAMEEEEEEEEEEEEEE " +fileName);
        String extension = "";


        int index = file.getContentType().lastIndexOf('/');
        if (index != -1 ) {
            extension = "." + file.getContentType().substring(index + 1);

        } else {
            for (int i = fileName.length() - 1; i >= 0 ; i--) {
                if (fileName.charAt(i) != '.') {
                    extension = fileName.charAt(i) + extension;
                } else {
                    extension = '.' + extension;
                    break;
                }
            }
        }
        //generate random filename
        String picker = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        StringBuilder name = new StringBuilder();
        for (int i = 0; i < 30; i++) {
            index = (int) (Math.random() * (62) + 0);
            name.append(picker.charAt(index));
        }

        fileName = name.toString();
        Path path;
        File test;
        String fullName;
        synchronized (lock) {

            int count = 0;
            do {

                if (count != 0) {
                    path = Paths.get("/home/ubuntu/server/userImages/" + fileName + count + extension);
                    fullName = fileName + count + extension;
                    test = new File("/home/ubuntu/server/userImages/" + fileName + count + extension);
                } else {
                    fullName = fileName + extension;
                    path = Paths.get("/home/ubuntu/server/userImages/" + fileName + extension);
                    test = new File("/home/ubuntu/server/userImages/" + fileName + extension);
                }

                count++;
                if (!test.exists()) {
                    break;
                }
            } while (test.exists());



            try {
                Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
            } catch (IOException e) {
                e.printStackTrace();
            }

        }

        return ResponseEntity.ok(new ContentDTO(fullName));
    }


}
