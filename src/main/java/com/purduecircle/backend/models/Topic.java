package com.purduecircle.backend.models; /**
 *
 * Represents a single post
 *
 * @author Nicholas Fang, Nicholas Gorki, Ron Kovler, Ryan Lechner, Jessica Majors
 * @version {date}
 *
 **/

import javax.persistence.*;
import java.util.HashSet;
import java.util.Locale;
import java.util.Set;
import javax.persistence.Table;
import java.sql.Timestamp;

@Entity
@Table(name = "topics")
public class Topic {

    public Topic(String topic_name, User user) {
        this.topic_name = topic_name.toLowerCase();
        this.user = user;
    }

    /*
     * Class variables
     */

    /* Unique ID for post, set when created */
    @Id
    private String topic_name;

    private int num_followers;

    private int num_posts;

    @OneToMany(mappedBy="topic")
    private Set<Post> posts_in_topic = new HashSet<>();

    public Topic() {

    }

    public String getTopic_name() {
        return topic_name;
    }

    public void setTopic_name(String topic_name) {
        this.topic_name = topic_name;
    }

    public int getNum_followed() {
        return num_followers;
    }

    public void setNum_followed(int num_followers) {
        this.num_followers = num_followers;
    }

    /*
     * Class methods
     */
}