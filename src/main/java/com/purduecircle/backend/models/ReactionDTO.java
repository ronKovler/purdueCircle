package com.purduecircle.backend.models;

public class ReactionDTO {
    private int userID;
    private int postID;
    private int reactionType;

    public ReactionDTO(int userID, int postID) {
        this.userID = userID;
        this.postID = postID;
    }

    public int getPostID() {
        return postID;
    }

    public void setPostID(int postID) {
        this.postID = postID;
    }

    public int getUserID() {
        return userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }
}
