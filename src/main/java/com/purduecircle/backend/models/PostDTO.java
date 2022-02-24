package com.purduecircle.backend.models;

public class PostDTO {
    private String content;
    private int userId;
    private String topicName;
    private int postId;

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

    public PostDTO(int postId) {
        this.postId = postId;
    }
}
