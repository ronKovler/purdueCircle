package com.purduecircle.backend.models;

public class DirectMessageDTO {
    private int fromUserID;
    private int toUserID;
    private String content;
    private int dmID;

    public int getFromUserID() {
        return fromUserID;
    }

    public void setFromUserID(int fromUserID) {
        this.fromUserID = fromUserID;
    }

    public int getToUserID() {
        return toUserID;
    }

    public void setToUserID(int toUserID) {
        this.toUserID = toUserID;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public DirectMessageDTO() {}

    public DirectMessageDTO(int fromUserID, int toUserID, String content, int dmID) {
        this.fromUserID = fromUserID;
        this.toUserID = toUserID;
        this.content = content;
        this.dmID = dmID;
    }
}
