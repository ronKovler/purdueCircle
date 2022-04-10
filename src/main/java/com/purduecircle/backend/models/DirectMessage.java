package com.purduecircle.backend.models;

import javax.persistence.*;
import java.sql.Timestamp;

/**
 *
 * Represents a direct message
 *
 * @author Nicholas Fang, Nicholas Gorki, Ron Kovler, Ryan Lechner, Jessica Majors
 * @version {date}
 *
 **/
@Entity
@Table(name = "direct_messages")
public class DirectMessage {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "dm_ID")
    private int dmID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fromUserID")
    private User fromUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "toUserID")
    private User toUser;

    @Column(name = "content")
    private String content;

    @Column(name = "time_sent")
    private Timestamp timeSent;

    public DirectMessage(User fromUser, User toUser, String content) {
        this.fromUser = fromUser;
        this.toUser = toUser;
        this.content = content;
        this.timeSent = new Timestamp(System.currentTimeMillis());
    }

    public DirectMessage(){}

    public int getDmID() {
        return dmID;
    }

    public void setDmID(int dmID) {
        this.dmID = dmID;
    }

    public User getFromUser() {
        return fromUser;
    }

    public void setFromUser(User fromUser) {
        this.fromUser = fromUser;
    }

    public User getToUser() {
        return toUser;
    }

    public void setToUser(User toUser) {
        this.toUser = toUser;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Timestamp getTimeSent() {
        return timeSent;
    }

    public void setTimeSent(Timestamp timeSent) {
        this.timeSent = timeSent;
    }
}
