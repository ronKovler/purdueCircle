package com.purduecircle.backend.repository;

import com.purduecircle.backend.models.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Integer> {
    @Query("SELECT c.chatID FROM ChatRoom c WHERE c.recipientID = :recipientID AND c.senderID = :senderID")
    String getChatID(@Param("recipientID") int recipientID, @Param("senderID") int senderID);
}
