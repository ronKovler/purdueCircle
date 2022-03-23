package com.purduecircle.backend.models;

public class UserDTO {
    private int userId;

    private String username;

    private String firstName;

    private String lastName;

    private String password;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    private String email;

    public UserDTO(User user) {
        this.username = user.getUsername();
        this.userId = user.getUserID();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        int length = user.getPassword().length();
        this.password = "*".repeat(length);
        this.email = user.getEmail();
    }

    public UserDTO(String password, String username, String firstName, String lastName, int userId) {
        this.userId = userId;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
    }

    public UserDTO(String username, int userId) {
        this.username = username;
        this.userId = userId;

    }

    public UserDTO(int userId) {
        this.userId = userId;
    }

    public UserDTO(){}

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
