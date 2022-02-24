package com.purduecircle.backend.models;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

/**
 *
 * Represents a topic
 *
 * @author Nicholas Fang, Nicholas Gorki, Ron Kovler, Ryan Lechner, Jessica Majors
 * @version {date}
 *
 **/

@Entity
@Table(name = "topics")
public class Topic {

    public Topic() {}

    public Topic(String topic_name) {
        this.topicName = topic_name;
    }

    @Id
    @Column(name = "topic_name")
    private String topicName;

    public String getTopicName() {
        return topicName;
    }

    public void setTopicName(String topicName) {
        this.topicName = topicName;
    }

    @OneToMany(mappedBy="topic")
    private Set<Post> postsInTopic = new HashSet<>();

    @OneToMany(mappedBy="topic")
    private Set<TopicFollower> followers = new HashSet<>();

}