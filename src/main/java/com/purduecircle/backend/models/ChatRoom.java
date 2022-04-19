package com.purduecircle.backend.models;

import javax.persistence.*;

@Entity
@Table(name = "chat_rooms")
public class ChatRoom {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "chat_room_ID")
    private String ID;
    @Column(name = "chatID")
    private String chatID;
    @Column(name = "senderID")
    private int senderID;
    @Column(name = "recipientID")
    private int recipientID;

    public ChatRoom(int senderID, int recipientID, String chatID) {
        this.senderID = senderID;
        this.recipientID = recipientID;

        this.chatID = chatID;
    }

    public ChatRoom(){}

    public String getID() {
        return ID;
    }

    public void setID(String ID) {
        this.ID = ID;
    }

    public String getChatID() {
        return chatID;
    }

    public void setChatID(String chatID) {
        this.chatID = chatID;
    }

    public int getSenderID() {
        return senderID;
    }

    public void setSenderID(int senderID) {
        this.senderID = senderID;
    }

    public int getRecipientID() {
        return recipientID;
    }

    public void setRecipientID(int recipientID) {
        this.recipientID = recipientID;
    }
}
