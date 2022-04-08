package com.purduecircle.backend.models;

public class SavedPostDTO {
    private int userID;
    private int postID;

    public SavedPostDTO() {}

    public SavedPostDTO(int userID, int postID) {
        this.userID = userID;
        this.postID = postID;
    }

    public int getUserID() { return userID; }

    public void setUserID(int userID) { this.userID = userID; }

    public int getPostID() { return postID; }

    public void setPostID(int postID) { this.postID = postID; }
}
