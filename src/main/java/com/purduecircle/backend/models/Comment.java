package com.purduecircle.backend.models; /**
*
* Represents a commment on a post
*
* @author Nicholas Fang, Nicholas Gorki, Ron Kovler, Ryan Lechner, Jessica Majors
* @version {date}
* 
**/

import java.time.LocalDateTime;

@Entity
@Table(name = "comment")
public class Comment {

    public Comment(String content, User user) {
        this.content = content;
        this.user = user;
        setCommentID();
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

    /* User that made post */
    @ManyToOne
    @JoinColumn(name="userID")
    private User user;

    @Column(name="timePosted")
    private LocalDateTime timePosted;

    /*
    * Getters and setters
    */

    public int getCommentID() {
        return commentID;
    }

    private void setCommentID() {
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

}