package com.purduecircle.backend.repository;

import com.purduecircle.backend.models.*;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface UserFollowerRepository extends JpaRepository<UserFollower, Integer> {

    UserFollower findByUserAndFollower(User user, User follower);
    List<UserFollower> findAllByFollower(User follower);
    void deleteByUserAndFollower(User user, User follower);
    List<UserFollower> findAllByUser(User user);
}