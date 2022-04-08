package com.purduecircle.backend.models;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UserDTO {
    private int userID;

    private String username;

    private String firstName;

    private String lastName;

    private String password;

    @JsonProperty("isPrivate")
    private boolean isPrivate;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    private String email;

    public UserDTO(User user) {
        this.username = user.getUsername();
        this.userID = user.getUserID();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        int length = user.getPassword().length();
        this.password = "*".repeat(length);
        this.email = user.getEmail();
        this.isPrivate = user.isPrivate();
    }

    public UserDTO(int userID, String password, String firstName, String lastName, String username, String email, boolean isPrivate) {
        this.userID = userID;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.isPrivate = isPrivate;
    }



//    public UserDTO(String password, String username, String firstName, String lastName, int userID) {
//        this.userID = userID;
//        this.password = password;
//        this.firstName = firstName;
//        this.lastName = lastName;
//        this.username = username;
//    }
//
//    public UserDTO(String username, int userID) {
//        this.username = username;
//        this.userID = userID;
//
//    }
//
//    public UserDTO(int userID) {
//        this.userID = userID;
//    }

    public UserDTO(){}

    @JsonProperty("isPrivate")
    public boolean isPrivate() {
        return isPrivate;
    }

    @JsonProperty("isPrivate")
    public void setPrivate(boolean aPrivate) {
        isPrivate = aPrivate;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getUserID() {
        return userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

}
