package com.purduecircle.backend.models;

public class PostDTO {
    private String content;
    private int userID;
    private String topicName;
    private int postID;
    private boolean anonymous;
    private String imagePath;
    private String link;

    /*Possibly remove these fields in place of getByUserID*/
    private String email;
    private String username;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public String getTopicName() {
        return topicName;
    }

    public void setTopicName(String topicName) {
        this.topicName = topicName;
    }

    public int getPostID() {
        return postID;
    }

    public void setPostID(int postID) {
        this.postID = postID;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }  

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }  

    public boolean isAnonymous() {
        return anonymous;
    }

    public void setAnonymous(boolean anonymous) {
        this.anonymous = anonymous;
    }

    public PostDTO(String content, int userID, String topicName, String email) {
        this.content = content;
        this.userID = userID;
        this.topicName = topicName;
        this.email = email;

    }

    public PostDTO(){}

    public PostDTO(String content, int userID, String topicName) {
        this.content = content;
        this.userID = userID;
        this.topicName = topicName;
    }

    public PostDTO(String content, int userID, String topicName, String email, boolean anonymous) {
        this.content = content;
        this.userID = userID;
        this.topicName = topicName;
        this.email = email;
        this.anonymous = anonymous;
    }

    public PostDTO(String content, int userID, String topicName, String email, boolean anonymous, String imagePath, String link) {
        this.content = content;
        this.userID = userID;
        this.topicName = topicName;
        this.email = email;
        this.anonymous = anonymous;
        this.imagePath = imagePath;
        this.link = link;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public PostDTO(Post post) {
        this.content = post.getContent();
        this.userID = post.getUser().getUserID();
        this.username = post.getUser().getUsername();
        System.out.println(post.getUser().getUsername());
        this.topicName = post.getTopic().getTopicName();
        this.postID = post.getPostID();
        this.anonymous = post.isAnonymous();

    }

    public PostDTO(int postID) {
        this.postID = postID;
    }
}
