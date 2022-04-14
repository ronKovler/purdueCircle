package com.purduecircle.backend.models;

public class CommentDTO {
    private int userID;
    private int postID;
    private String content;
    private String username;

    public CommentDTO() {}

    public CommentDTO(int userID, int postID, String content, String username) {
        this.userID = userID;
        this.postID = postID;
        this.content = content;
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getUserID() { return this.userID; }

    public void setUserID(int userID) { this.userID = userID; }

    public int getPostID() { return this.postID; }

    public void setPostID(int postID) { this.postID = postID; }

    public String getContent() { return this.content; }

    public void setContent(String content) {this.content = content; }

}
