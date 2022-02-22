package com.purduecircle.backend.models; /**
*
* Represents a single post
*
* @author Nicholas Fang, Nicholas Gorki, Ron Kovler, Ryan Lechner, Jessica Majors
* @version {date}
* 
**/

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Table;
import java.sql.Timestamp;

@Entity
@Table(name = "posts")
public class Post {

    public Post(String content, User user, String topic) {
        this.content = content;
        this.user = user;
        this.topic = topic;
    }

    /*
    * Class variables
    */

    /* Unique ID for post, set when created */
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int postID;

    /* Text, picture, or URL data in content */
    @Column(name="content", length=255)
    private String content;

    /* User that made post */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="userID")
    private User user;

    @Column(name="time_posted")
    private Timestamp time_posted;

    @Column(name="likes", nullable=true)
    private int likes;

    /* List of comments on post */
    @OneToMany(mappedBy="post")
    private Set<Comment> comments = new HashSet<>();

    @Column(name="topic", length=64)
    private String topic;

    public Post() {

    }

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
        this.postID = postID;
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

    public Timestamp getTimePosted() {
        return time_posted;
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