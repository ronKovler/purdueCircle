package com.purduecircle.backend.models;

import javax.persistence.*;

@Entity
@Table(name = "user_blocked")
public class UserBlocked {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_blocked_ID")
    private int userFollowerID;

    @ManyToOne
    @JoinColumn(name = "blockedUserID")
    private User blockedUser;

    @ManyToOne
    @JoinColumn(name = "userID")
    private User user;

    public UserBlocked(User user, User blockedUser) {
        this.user = user;
        this.blockedUser = blockedUser;
    }

    public UserBlocked(){}

    public int getUserFollowerID() {
        return userFollowerID;
    }

    public void setUserFollowerID(int userFollowerID) {
        this.userFollowerID = userFollowerID;
    }

    public User getBlockedUser() {
        return blockedUser;
    }

    public void setBlockedUser(User blockedUser) {
        this.blockedUser = blockedUser;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
