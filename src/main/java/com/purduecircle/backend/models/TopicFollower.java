package com.purduecircle.backend.models;

import javax.persistence.*;

/**
 *
 * Represents a relational table between topic and followers of topic
 *
 * @author Nicholas Fang, Nicholas Gorki, Ron Kovler, Ryan Lechner, Jessica Majors
 * @version {date}
 *
 **/

@Entity
@Table(name = "topic_followers")
public class TopicFollower {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "topic_follower_ID")
    private int topicFollowerID;

    @ManyToOne
    @JoinColumn(name = "topic_name")
    private Topic topic;

    @ManyToOne
    @JoinColumn(name="followerID")
    private User follower;

    /*
    Getters and Setters
     */
    public int getTopicFollowerID() {
        return topicFollowerID;
    }

    public Topic getTopic() {
        return topic;
    }

    public void setTopic(Topic topic) {
        this.topic = topic;
    }

    public User getFollower() {
        return follower;
    }

    public void setFollower(User follower) {
        this.follower = follower;
    }
}
