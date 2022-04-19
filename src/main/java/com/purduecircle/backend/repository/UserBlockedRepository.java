package com.purduecircle.backend.repository;

import com.purduecircle.backend.models.User;
import com.purduecircle.backend.models.UserBlocked;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserBlockedRepository extends JpaRepository<UserBlocked, Integer> {
    UserBlocked findByUserAndBlockedUser(User user, User blocked);
    void deleteByUserAndBlockedUser(User user, User blocked);
}
