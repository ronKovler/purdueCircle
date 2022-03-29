package com.purduecircle.backend.models;

public class SearchDTO {
    private String content;

    public SearchDTO(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
