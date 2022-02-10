/**
*
* Represents a user of the app (has account)
*
* @author Nicholas Fang, Nicholas Gorki, Ron Kovler, Ryan Lechner, Jessica Majors
* @version {date}
* 
**/

import java.util.ArrayList;

public class User {

    public User(String firstName, String lastName, String email, String username, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.username = username;
        this.password = password;
    }

    /*
    * Class variables
    */

    /* Required user field */
    private String firstName;

    /* Required user field */
    private String lastName;

    /* Serves as uniqueID, cannot be changed, required user field */
    private String email;

    /* Unique to user, requried user field */
    private String username;

    /* Required user field */
    private String password;

    private String phoneNumber;

    /* List of other users following this user */   
    private ArrayList<User> followers;

    /* List of other users this user is following */   
    private ArrayList<User> followedUsers;

    /* List of users this user has blocked */   
    private ArrayList<User> blockedUsers;

    /* List of topics this user is following */   
    private ArrayList<String> followedTopics;

    /* List of poosts made by user */   
    private ArrayList<Post> userPosts;

    /* List of posts saved by this user */   
    private ArrayList<Post> savedPosts;

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
    * Getters and setters
    */

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

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public ArrayList<User> getFollowers() {
        return followers;
    }

    public void setFollowers(ArrayList<User> followers) {
        this.followers = followers;
    }

    public ArrayList<User> getFollowedUsers() {
        return followedUsers;
    }

    public void setFollowedUsers(ArrayList<User> followedUsers) {
        this.followedUsers = followedUsers;
    }

    public ArrayList<User> getBlockedUsers() {
        return blockedUsers;
    }

    public void setBlockedUsers(ArrayList<User> blockedUsers) {
        this.blockedUsers = blockedUsers;
    }

    public ArrayList<String> getFollowedTopics() {
        return followedTopics;
    }

    public void setFollowedTopics(ArrayList<String> followedTopics) {
        this.followedTopics = followedTopics;
    }
}
