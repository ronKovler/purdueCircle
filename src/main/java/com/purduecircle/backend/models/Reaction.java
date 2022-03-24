package com.purduecircle.backend.models;

import javax.persistence.*;
import java.sql.Timestamp;

/**
 *
 * Represents a reaction on a post
 *
 * @author Nicholas Fang, Nicholas Gorki, Ron Kovler, Ryan Lechner, Jessica Majors
 * @version {date}
 *
 **/


@Entity
@Table(name = "reactions")
public class Reaction {

    public Reaction() {};

    public Reaction(int reaction_type, User user, Post post) {
        this.reactionType = reaction_type;
        this.user = user;
        this.post = post;
        this.timeReacted = new Timestamp(System.currentTimeMillis());

        //this.post.set
    }

    @Id
    @Column(name="reactionID")
    private int reactionID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="postID")
    private Post post;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="userID")
    private User user;

    @Column(name="time_reacted")
    private Timestamp timeReacted;

    // Like = 0, dislike = 1 (TODO dislike)
    @Column(name="reaction_type")
    private int reactionType;


    public int getReactionID() {
        return reactionID;
    }

    public void setReactionID(int reactionID) {
        this.reactionID = reactionID;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Timestamp getTimeReacted() {
        return timeReacted;
    }

    public void setTimeReacted(Timestamp timeReacted) {
        this.timeReacted = timeReacted;
    }

    public int getReactionType() {
        return reactionType;
    }

    public void setReactionType(int reactionType) {
        this.reactionType = reactionType;
    }
}