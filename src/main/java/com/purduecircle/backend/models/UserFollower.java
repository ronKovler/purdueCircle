package com.purduecircle.backend.models;

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

    public UserFollower() {}

    public UserFollower(User user, User follower) {
        this.user = user;
        this.follower = follower;
    }

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

    public int getUserFollowerID() {
        return userFollowerID;
    }

    public void setUserFollowerID(int userFollowerID) {
        this.userFollowerID = userFollowerID;
    }

    public User getFollower() {
        return follower;
    }

    public void setFollower(User follower) {
        this.follower = follower;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
