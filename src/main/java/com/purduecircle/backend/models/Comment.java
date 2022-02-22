package com.purduecircle.backend.models;
import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Set;
/**
*
* Represents a commment on a post
*
* @author Nicholas Fang, Nicholas Gorki, Ron Kovler, Ryan Lechner, Jessica Majors
* @version {date}
* 
**/

import java.sql.Timestamp;

@Entity
@Table(name = "comments")
public class Comment {

    public Comment(String content, String username, Post post) {
        this.content = content;
        this.username = username;
        this.post = post;
    }

    /*
    * Class variables
    */

    /* Unique ID for comment, set when created */
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int commentID;

    /* Text, picture, or URL data in content */
    @Column(name="content", length=255)
    private String content;

    @Column(name="username")
    private String username;

    /* User that made post */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="postID")
    private Post post;

    @Column(name="time_posted")
    private Timestamp time_posted;

    public Comment() {

    }

    /*
    * Getters and setters
    */

    public int getCommentID() {
        return commentID;
    }

    private void setCommentID() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Timestamp getTimePosted() {
        return time_posted;
    }

}