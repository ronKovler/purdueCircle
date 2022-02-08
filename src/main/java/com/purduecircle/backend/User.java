package com.purduecircle.backend;

import java.util.ArrayList;

public class User {
    private String firstName;
    private String lastName;
    private String email;
    private String username;
    private String password;
    private String phoneNumber;
    private ArrayList<User> followers;
    private ArrayList<User> followedUsers;
    private ArrayList<User> blockedUsers;
    private ArrayList<String> followedTopics;
    //private ArrayList<Post> userPosts;
    //private ArrayList<Post> savedPosts;


    private String getFirstName() {
        return firstName;
    }

    private void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    private String getLastName() {
        return lastName;
    }

    private void setLastName(String lastName) {
        this.lastName = lastName;
    }

    private String getEmail() {
        return email;
    }

    private void setEmail(String email) {
        this.email = email;
    }

    private String getUsername() {
        return username;
    }

    private void setUsername(String username) {
        this.username = username;
    }

    private String getPassword() {
        return password;
    }

    private void setPassword(String password) {
        this.password = password;
    }

    private String getPhoneNumber() {
        return phoneNumber;
    }

    private void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    private ArrayList<User> getFollowers() {
        return followers;
    }

    private void setFollowers(ArrayList<User> followers) {
        this.followers = followers;
    }

    private ArrayList<User> getFollowedUsers() {
        return followedUsers;
    }

    private void setFollowedUsers(ArrayList<User> followedUsers) {
        this.followedUsers = followedUsers;
    }

    private ArrayList<User> getBlockedUsers() {
        return blockedUsers;
    }

    private void setBlockedUsers(ArrayList<User> blockedUsers) {
        this.blockedUsers = blockedUsers;
    }

    private ArrayList<String> getFollowedTopics() {
        return followedTopics;
    }

    private void setFollowedTopics(ArrayList<String> followedTopics) {
        this.followedTopics = followedTopics;
    }
}

