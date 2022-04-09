package com.purduecircle.backend.repository;

import com.purduecircle.backend.models.*;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface UserFollowerRepository extends JpaRepository<UserFollower, Integer> {

    UserFollower findByUserAndFollower(User user, User follower);
    List<UserFollower> findAllByFollower(User follower);
    void deleteByUserAndFollower(User user, User follower);
    List<UserFollower> findAllByUser(User user);

    //List<UserFollower> findAllByFollowerAndBlockedIsTrue(User follower); //returns list of blocked users
    //List<UserDTO> findAllByFollowerAndBlockedIsFalse(User follower); //returns list of users follower is FOLLOWING

    @Query("SELECT u.user.userID FROM UserFollower u WHERE u.follower = :follower") // returns list of following user ids
    List<Integer> findFollowingUserIDs(@Param("follower") User follower);


}