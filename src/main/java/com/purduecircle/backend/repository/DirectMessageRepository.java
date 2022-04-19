package com.purduecircle.backend.repository;

import com.purduecircle.backend.models.DirectMessage;
import com.purduecircle.backend.models.DirectMessageDTO;
import com.purduecircle.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DirectMessageRepository extends JpaRepository<DirectMessage, Integer> {

    List<DirectMessage> getDirectMessagesByFromUserAndToUser(User fromUser, User toUser);

    @Query("SELECT new com.purduecircle.backend.models.DirectMessageDTO(m.fromUser.userID, m.toUser.userID, m.content, m.dmID) " +
            "FROM DirectMessage m WHERE (m.fromUser = :user OR m.toUser = :user) ORDER BY m.timeSent DESC")
    List<DirectMessageDTO> getAllDirectMessagesByUser(@Param("user") User user);

    @Query("SELECT new com.purduecircle.backend.models.DirectMessageDTO(m.fromUser.userID, m.toUser.userID, m.content, m.dmID) " +
            "FROM DirectMessage m WHERE (m.fromUser = :from AND m.toUser = :to) OR " +
            "(m.fromUser = :to AND m.toUser = :from) ORDER BY m.timeSent ASC")
    List<DirectMessageDTO> getAllMessagesBetweenUsers(@Param("from") User from, @Param("to") User to);
}
