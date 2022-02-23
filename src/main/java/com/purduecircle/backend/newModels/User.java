package com.purduecircle.backend.newModels;

import com.purduecircle.backend.newModels.Topic;

import javax.persistence.*;
import java.util.HashSet;
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
    @Column(name="email", length=64, unique=true)
    private String email;

    /* Unique to user */
    @Column(name="username", length=64, unique=true)
    private String username;

    @Column(name="password", length=64, unique=true)
    private String password;

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

    public User(String first_name, String last_name, String email, String username, String password, String phone_number) {
        this.firstName = first_name;
        this.lastName = last_name;
        this.email = email;
        this.username = username;
        this.password = password;
        this.phoneNumber = phone_number;
    }

    public User(String first_name, String last_name, String email, String username, String password) {
        this.firstName = first_name;
        this.lastName = last_name;
        this.email = email;
        this.username = username;
        this.password = password;
    }

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public User() {}

    /* add topic to list of topics this user is following */
    public void addFollowedTopic(Topic topic) {
        // TODO: Corresponding UserController method exists and is done
        // TODO: have to edit topic info
    }

    /* remove topic to list of topics this user is following */
    public void removeFollowedTopic(Topic topic) {
        // TODO: Corresponding UserController method exists and is done
        // TODO: have to edit topic info
    }

    /* add topic to list of topics this user is following */
    public void addFollowedUser(User user) {
        // TODO: Corresponding UserController method exists and is done
    }

    /* remove topic to list of topics this user is following */
    public void removeFollowedUser(User user) {
        // TODO: Corresponding UserController method exists and is done
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
        this.username = username;
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

}
