package com.purduecircle.backend.models;

public class DirectMessageDTO {
    private int fromUserID;
    private int toUserID;
    private String content;

    public int getFromUser() {
        return fromUserID;
    }

    public void setFromUser(User fromUser) {
        this.fromUserID = fromUserID;
    }

    public int getToUser() {
        return toUserID;
    }

    public void setToUser(User toUser) {
        this.toUserID = toUserID;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public DirectMessageDTO() {}

    public DirectMessageDTO(int fromUserID, int toUserID, String content) {
        this.fromUserID = fromUserID;
        this.toUserID = toUserID;
        this.content = content;
    }
}
