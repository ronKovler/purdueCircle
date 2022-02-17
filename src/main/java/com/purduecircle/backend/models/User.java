package com.purduecircle.backend.models;
/**
*
* Represents a user of the app (has account)
*
* @author Nicholas Fang, Nicholas Gorki, Ron Kovler, Ryan Lechner, Jessica Majors
* @version {date}
* 
**/

import java.io.Serializable;
import javax.persistence.*;
import java.util.ArrayList;

@Entity
@Table(name = "users")

public class User {

    /*
    * Class variables
    */

    /* Required user field */
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    /* TABLE indicates that the persistence provider must assign primary keys
    for the entity using an underlying database table to ensure uniqueness */
    private int userID;

    /* Required user field */

    @Column(name="firstName", length=64, nullable=false)
    private String firstName;

    /* Required user field */
    @Column(name="lastName", length=64, nullable=false)
    private String lastName;

    /* Serves as uniqueID, cannot be changed, required user field */
    @Column(name="email", length=64, nullable=false, unique=true)
    private String email;

    /* Unique to user, requried user field */
    @Column(name="username", length=64, nullable=false, unique=true)
    private String username;

    /* Required user field */
    @Column(name="password", length=64, nullable=false, unique=true)
    private String password;

    @Column(name="phoneNumber", nullable=true)
    private String phoneNumber;

    /*
    * Class methods
    */

    /* Show timeline based on most liked posts in last 24 hrs */
    public void getHotTimeline() {
    }

    /* Show timemline based on followed users and topics */
    public void getPersonalTimeline() {
    }

    /* show timeline based on selected topic */
    public void getTopicTimeline() {
    }

    /* show selected user profile */
    public void getUserProfile(User user) {
    }

     /* add user to list of other users following this user */
    public void addFollower(User user) {
    }   

    /* remove user to list of other users following this user */
    public void removeFollower(User user) {
    }

     /* add user to list of other users this user is following */
    public void addFollowing(User user) {
    }   

    /* remove user to list of other users this user is following */
    public void removeFollowing(User user) {
    }

     /* add topic to list of topics this user is following */
    public void addTopic(User user) {
    }   

    /* remove topic to list of topics this user is following */
    public void removeTopic(User user) {
    }

     /* add user to list this user has blocked */
    public void addBlockedUser(User user) {
    }   

    /* remove user from list this user has blocked */
    public void removeBlockedUser(User user) {
    }

     /* add post to list of posts this user has saved */
    public void savePost(Post post) {
    }   

    /* remove post from list of posts this user has saved */
    public void unsavePost(Post post) {
    }

     /* add post to list of posts made by user and to database */
    public void makePost(Post post) {
    }   

    /* remove post from list of posts made by user and from database */
    public void deletePost(Post post) {
    }

    /*
    * Getters
    */

    public int getUserID() {
        return userID;
    }   

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public ArrayList<User> getFollowers() {
        return null;
    }

    public ArrayList<User> getFollowedUsers() {
        return null;
    }

    public ArrayList<User> getBlockedUsers() {
        return null;
    }

    public ArrayList<String> getFollowedTopics() {
        return null;
    }
}
