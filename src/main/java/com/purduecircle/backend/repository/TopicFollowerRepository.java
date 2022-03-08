package com.purduecircle.backend.repository;

import com.purduecircle.backend.models.*;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface TopicFollowerRepository extends JpaRepository<TopicFollower, Integer> {

    TopicFollower findByFollowerAndTopic(User follower, Topic topic);
    void deleteByFollowerAndTopic(User follower, Topic topic);

    List<TopicFollower> findAllByFollower(User follower); //might be wrong

}