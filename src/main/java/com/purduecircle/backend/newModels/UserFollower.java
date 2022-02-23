package com.purduecircle.backend.newModels;

import javax.persistence.*;

/**
 *
 * Represents a relational table between users and followers of said user
 *
 * @author Nicholas Fang, Nicholas Gorki, Ron Kovler, Ryan Lechner, Jessica Majors
 * @version {date}
 *
 **/

@Entity
@Table(name = "user_followers")
public class UserFollower {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_follower_ID")
    private int userFollowerID;

    @ManyToOne
    @JoinColumn(name = "followerID")
    private User follower;

    @ManyToOne
    @JoinColumn(name = "userID")
    private User user;
}
