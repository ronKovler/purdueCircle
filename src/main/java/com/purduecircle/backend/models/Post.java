package com.purduecircle.backend.models; /**
*
* Represents a single post
*
* @author Nicholas Fang, Nicholas Gorki, Ron Kovler, Ryan Lechner, Jessica Majors
* @version {date}
* 
**/

import java.util.ArrayList;
import java.time.LocalDateTime;

public class Post {

    public Post(String content, User user, String topic) {
        this.content = content;
        this.user = user;
        this.topic = topic;
        setPostID();
    }

    /*
    * Class variables
    */

    /* Unique ID for post, set when created */
    private int postID;

    /* Text, picture, or URL data in content */
    private String content;

    /* User that made post */
    private User user;

    private LocalDateTime timePosted;

    private int likes;

    /* List of comments on post */
    private ArrayList<Comment> comments;

    private String topic;

    /*
    * Class methods
    */

    public void incrementLike() {
    }

    public void decrementLike() {
    }

    public void addComment(Comment comment) {
    }

    public void removeComment(Comment comment) {
    }

    /*
    * Getters and setters
    */

    public int getPostID() {
        return postID;
    }

    private void setPostID() {
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public User getUser() {
        return user;
    }

    public LocalDateTime getTimePosted() {
        return timePosted;
    }

    public int getLikes() {
        return likes;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }
    
}