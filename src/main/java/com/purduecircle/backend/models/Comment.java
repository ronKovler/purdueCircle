package com.purduecircle.backend.models;

import javax.persistence.*;
import java.sql.Timestamp;
/**
 *
 * Represents a comment on a post
 *
 * @author Nicholas Fang, Nicholas Gorki, Ron Kovler, Ryan Lechner, Jessica Majors
 * @version {date}
 *
 **/


@Entity
@Table(name = "comments")
public class Comment {

    public Comment() {}

    public Comment(String username, User user, String content, Post post) {
        this.username = username;
        this.user = user;
        this.content = content;
        this.post = post;
    }

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "commentID")
    private int commentID;

    @Column(name="username")
    private String username;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="userID")
    private User user;

    /* Text, picture, or URL data in content */
    @Column(name="content", length=255)
    private String content;

    @Column(name="time_posted")
    private Timestamp timePosted;

    /* User that made post */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="postID")
    private Post post;

    /*
    Getters and Setters
     */

    public int getCommentID() {
        return commentID;
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

    public Timestamp getTime_posted() {
        return timePosted;
    }

    public Post getPost() {
        return post;
    }




}
