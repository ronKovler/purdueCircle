package com.purduecircle.backend.models;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;
import java.sql.Timestamp;
import com.purduecircle.backend.repository.UserRepository;
import com.purduecircle.backend.repository.TopicRepository;

/**
 *
 * Represents a single post
 *
 * @author Nicholas Fang, Nicholas Gorki, Ron Kovler, Ryan Lechner, Jessica Majors
 * @version {date}
 *
 **/

@Entity
@Table(name = "posts")
public class Post implements Comparable<Post>{

    public Post(String content, User user, Topic topic) {
        this.content = content;
        this.user = user;
        this.topic = topic;
    }

    public Post() {}

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "postID")
    private int postID;

    @Column(name="content", length=255)
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="userID")
    private User user;

    @Column(name="anonymous")
    private boolean anonymous;

    @Column(name="time_posted")
    private Timestamp timePosted;

    @OneToMany(mappedBy="post")
    private Set<Comment> comments = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="topic_name")
    private Topic topic;

    // TODO: need to map posts to reactions or just have a field with num likes
    @OneToMany(mappedBy="post")
    private Set<Reaction> reactions;

    public void addReaction(Reaction reaction) {
        reactions.add(reaction);
    }

    /* remove topic to list of topics this user is following */
    public void removeReaction(Reaction reaction) {
        reactions.remove(reaction);
    }

    /*
    Getters and Setters
     */

    public boolean isAnonymous() {
        return anonymous;
    }

    public void setAnonymous(boolean anonymous) {
        this.anonymous = anonymous;
    }

    public int getPostID() {
        return postID;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public User getUser() {
        return user;
    }

    public Timestamp getTimePosted() {
        return timePosted;
    }

    public Set<Comment> getComments() {
        return comments;
    }

    public Topic getTopic() {
        return topic;
    }

    public Set<Reaction> getReactions() {
        return reactions;
    }

    public int compareTo(Post post) {
        return this.getTimePosted().compareTo(post.getTimePosted());
    }
}
