package com.purduecircle.backend.repository;

import com.purduecircle.backend.models.DirectMessage;
import com.purduecircle.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DirectMessageRepository extends JpaRepository<DirectMessage, Integer> {

    List<DirectMessage> getDirectMessagesByFromUserAndToUser(User fromUser, User toUser);
}
