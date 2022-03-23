package com.purduecircle.backend.models;

public class PostDTO {
    private String content;
    private int userId;
    private String topicName;
    private int postId;
    private boolean anonymous;

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

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getTopicName() {
        return topicName;
    }

    public void setTopicName(String topicName) {
        this.topicName = topicName;
    }

    public int getPostId() {
        return postId;
    }

    public void setPostId(int postId) {
        this.postId = postId;
    }

    public boolean isAnonymous() {
        return anonymous;
    }

    public void setAnonymous(boolean anonymous) {
        this.anonymous = anonymous;
    }

    public PostDTO(String content, int userId, String topicName, String email) {
        this.content = content;
        this.userId = userId;
        this.topicName = topicName;
        this.email = email;

    }

    public PostDTO(){}

    public PostDTO(String content, int userId, String topicName) {
        this.content = content;
        this.userId = userId;
        this.topicName = topicName;
    }

    public PostDTO(String content, int userId, String topicName, String email, boolean anonymous) {
        this.content = content;
        this.userId = userId;
        this.topicName = topicName;
        this.email = email;
        this.anonymous = anonymous;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public PostDTO(Post post) {
        this.content = post.getContent();
        this.userId = post.getUser().getUserID();
        this.username = post.getUser().getUsername();
        System.out.println(post.getUser().getUsername());
        this.topicName = post.getTopic().getTopicName();
        this.postId = post.getPostID();
        this.anonymous = post.isAnonymous();

    }

    public PostDTO(int postId) {
        this.postId = postId;
    }
}
