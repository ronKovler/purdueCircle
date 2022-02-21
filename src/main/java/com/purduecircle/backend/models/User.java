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

    @Column(name="first_name", length=64, nullable=true)
    private String first_name;

    /* Required user field */
    @Column(name="last_name", length=64, nullable=true)
    private String last_name;

    /* Serves as uniqueID, cannot be changed, required user field */
    @Column(name="email", length=64, nullable=true, unique=true)
    private String email;

    /* Unique to user, requried user field */
    @Column(name="username", length=64, nullable=true, unique=true)
    private String username;

    /* Required user field */
    @Column(name="password", length=64, nullable=true, unique=true)
    private String password;

    @Column(name="phone_number", nullable=true)
    private String phone_number;

    public User(String first_name, String last_name, String email, String username, String password, String phone_number) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.username = username;
        this.password = password;
        this.phone_number = phone_number;
    }

    public User() {

    }

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }

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
    * Getters & Setters 
    */

    public int getUserID() {
        return userID;
    }

    public String getFirstName() {
        return first_name;
    }

    public void setFirstName(String first_name) {
        this.first_name = first_name;
    }

    public String getLastName() {
        return last_name;
    }

    public void setLastName(String last_name) {
        this.last_name = last_name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }    

    public String getPhoneNumber() {
        return phone_number;
    }

    public void setPhoneNumber(String phone_number) {
        this.phone_number = phone_number;
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
