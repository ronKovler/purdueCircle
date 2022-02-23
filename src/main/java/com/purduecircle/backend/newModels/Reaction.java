package com.purduecircle.backend.newModels;

import com.purduecircle.backend.newModels.Comment;
import com.purduecircle.backend.newModels.Topic;
import com.purduecircle.backend.newModels.User;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;
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

    // Like = 0, dislike = 1
    @Column(name="reaction_type")
    private int reactionType;

}