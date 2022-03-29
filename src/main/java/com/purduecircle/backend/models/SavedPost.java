package com.purduecircle.backend.models;

import javax.persistence.*;

@Entity
@Table(name = "saved_posts")
public class SavedPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "saved_post_ID")
    private int savedPostID;

    @ManyToOne
    @JoinColumn(name = "userID")
    private User user;

    @ManyToOne
    @JoinColumn(name="postID")
    private Post savedPost;

    public SavedPost(){}

    public SavedPost(User user, Post savedPost) {
        this.user = user;
        this.savedPost = savedPost;
    }

    public int getSavedPostID() {
        return savedPostID;
    }

    public void setSavedPostID(int savedPostID) {
        this.savedPostID = savedPostID;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Post getSavedPost() {
        return savedPost;
    }

    public void setSavedPost(Post savedPost) {
        this.savedPost = savedPost;
    }
}
