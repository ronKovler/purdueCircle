package com.purduecircle.backend.models;

public class UserDTO {
    private int userId;

    private String username;

    public UserDTO(User user) {
        this.username = user.getUsername();
        this.userId = user.getUserID();
    }

    public UserDTO(String username, int userId) {
        this.username = username;
        this.userId = userId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
