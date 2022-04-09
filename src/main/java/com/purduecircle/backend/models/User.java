package com.purduecircle.backend.models;

import com.purduecircle.backend.AdditionalResources.StringAttributeConverter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.persistence.Table;

/**
 *
 * Represents a single user
 *
 * @author Nicholas Fang, Nicholas Gorki, Ron Kovler, Ryan Lechner, Jessica Majors
 * @version {date}
 *
 **/

@Entity
@Table(name = "users")
//@SecondaryTable(name = "user_followers")
public class User {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "userID")
    /* TABLE indicates that the persistence provider must assign primary keys
    for the entity using an underlying database table to ensure uniqueness */
    private int userID;

    @Column(name="first_name", length=64)
    private String firstName;

    @Column(name="last_name", length=64)
    private String lastName;

    /* Unique, cannot change */
    //@Convert(converter = StringAttributeConverter.class)
    @Column(name="email", length=64, unique=true)
    private String email;

    /* Unique to user */
    @Column(name="username", length=64, unique=true)
    private String username;

    @Convert(converter = StringAttributeConverter.class)
    @Column(name="password", length=64, unique=true)
    private String password;

    //@Convert(converter = StringAttributeConverter.class)
    @Column(name="phone_number")
    private String phoneNumber;

    @OneToMany(mappedBy="user")
    private Set<Post> userPosts = new HashSet<>();

    @OneToMany(mappedBy="user")
    private Set<Post> savedPosts = new HashSet<>();

    // TODO: check mapping MAYBE SWITCH "user" and "follower"
    @OneToMany(mappedBy="user")
    //@Column(name = "followerID", table = "user_followers")
    private Set<UserFollower> followers = new HashSet<>();

    @OneToMany(mappedBy="follower")
    private Set<UserFollower> following = new HashSet<>();

    @OneToMany(mappedBy="follower")
    private Set<TopicFollower> followedTopics = new HashSet<>();

    @OneToMany(mappedBy="user")
    private Set<UserBlocked> blocked = new HashSet<>();

    @Column(name="private")
    private boolean isPrivate;



    public User(String firstName, String lastName, String email, String username, String password, String phone_number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.username = username;
        this.password = password;
        this.phoneNumber = phone_number;
        this.isPrivate = false;
    }

    public User(String firstName, String lastName, String email, String username, String password, int userID, boolean isPrivate) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.username = username;
        this.password = password;
        this.userID = userID;
        this.isPrivate = isPrivate;
    }

    public User(String firstName, String lastName, String email, String username, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.username = username;
        this.password = password;
        this.isPrivate = false;
    }

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public User(String email, String username, String password) {
        this.email = email;
        this.username = username;
        this.password = password;
    }

    public User(int userID) {
        this.userID = userID;
    }

    public User(String password, String firstName, String lastName, String username) {
        this.password = password;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public User(int userID, String password, String firstName, String lastName, String username) {
        this.userID = userID;
        this.password = password;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public User(int userID, String password, String firstName, String lastName, String username, String email) {
        this.userID = userID;
        this.password = password;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    public User() {}

    public Set<UserBlocked> getBlocked() {
        return blocked;
    }

    public void setBlocked(Set<UserBlocked> blocked) {
        this.blocked = blocked;
    }

    /* add topic to list of topics this user is following */
    public void addFollowedTopic(TopicFollower newTopicFollower) {
        followedTopics.add(newTopicFollower);
    }

    /* remove topic to list of topics this user is following */
    public void removeFollowedTopic(TopicFollower newTopicFollower) {
        followedTopics.remove(newTopicFollower);
    }

    /* add topic to list of topics this user is following */
    public void addFollower(UserFollower newUserFollower) {
        followers.add(newUserFollower);
    }

    /* remove topic to list of topics this user is following */
    public void removeFollower(UserFollower newUserFollower) {
        followers.remove(newUserFollower);
    }

    /* add topic to list of topics this user is following */
    public void addFollowing(UserFollower newUserFollower) {
        following.add(newUserFollower);
    }

    /* remove topic to list of topics this user is following */
    public void removeFollowing(UserFollower newUserFollower) {
        following.add(newUserFollower);
    }

    public int getUserID() {
        return userID;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String first_name) {
        this.firstName = first_name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String last_name) {
        this.lastName = last_name;
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
        this.username = username.toLowerCase();
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phone_number) {
        this.phoneNumber = phone_number;
    }

    public Set<Post> getSavedPosts() {
        return savedPosts;
    }

    public void setSavedPosts(Set<Post> savedPosts) {
        this.savedPosts = savedPosts;
    }

    public boolean isPrivate() {
        return isPrivate;
    }

    public void setPrivate(boolean aPrivate) {
        isPrivate = aPrivate;
    }
}
