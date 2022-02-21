package com.purduecircle.backend.models; /**
*
* Represents a single post
*
* @author Nicholas Fang, Nicholas Gorki, Ron Kovler, Ryan Lechner, Jessica Majors
* @version {date}
* 
**/

import java.time.LocalDateTime;

@Entity
@Table(name = "post")
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
    @ManyToOne
    @JoinColumn(name="userID")
    private User user;

    @Column(name="timePosted")
    private LocalDateTime timePosted;

    @Column(name="likes", nullable=true)
    private int likes;

    /* List of comments on post */
    @OneToMany(mappedBy="commentID")
    private Set<Comment> comments;

    @Column(name="topic", length=64)
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