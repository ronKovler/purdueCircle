package com.purduecircle.backend.models;

public class PostDTO {
    private String content;
    private int userId;
    private String topicName;
    private int postId;

    private String username;

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

    public PostDTO(String content, int userId, String topicName) {
        this.content = content;
        this.userId = userId;
        this.topicName = topicName;
    }

    public PostDTO(Post post) {
        this.content = post.getContent();
        this.userId = post.getUser().getUserID();
        this.username = post.getUser().getUsername();
        this.topicName = post.getTopic().getTopicName();
        this.postId = post.getPostID();

    }

    public PostDTO(int postId) {
        this.postId = postId;
    }
}
