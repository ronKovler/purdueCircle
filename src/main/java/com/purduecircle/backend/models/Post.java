package com.purduecircle.backend.models;

import javax.persistence.*;
import java.time.DateTimeException;
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

    public Post(String content, User user, Topic topic, boolean anonymous) {
        this.anonymous = anonymous;
        this.content = content;
        this.user = user;
        this.topic = topic;
        this.timePosted = new Timestamp(System.currentTimeMillis());
    }

    public Post(String content, User user, Topic topic, boolean anonymous, String imagePath, String link) {
        this.anonymous = anonymous;
        this.content = content;
        this.user = user;
        this.topic = topic;
        this.timePosted = new Timestamp(System.currentTimeMillis());
        this.imagePath = imagePath;
        this.link = link;
    }

    public Post() {}

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "postID")
    private int postID;

    @Column(name="content", length=255)
    private String content;

    @Column(name="image_path", length = 1024)
    private String imagePath;

    @Column(name="link", length = 1024)
    private String link;

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

    /* remove topic to list of topics this user is following */
    public void addComment(Comment comment) { comments.add(comment); }

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

    public String getImagePath() {
        return imagePath;
    }

    // Called by saveImage()
    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
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

    public int getNetReactions() {
        int net = 0;
        for (Reaction current : reactions) {
            if (current.getReactionType() == 0) {
                net++;
            }
            if (current.getReactionType() == 1) {
                net--;
            }
        }
        return net;
    }

    public int compareTo(Post post) {
        return this.getTimePosted().compareTo(post.getTimePosted());
    }
}
