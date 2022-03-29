package com.purduecircle.backend.models;

public class SearchDTO {
    private String content;
    private int userID;

    public SearchDTO(String content) {
        this.content = content;
        this.userID = -1;
    }

    public SearchDTO(String content, int userID) {
        this.content = content;
        this.userID = userID;
    }
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getUserID() {
        return userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }
}
