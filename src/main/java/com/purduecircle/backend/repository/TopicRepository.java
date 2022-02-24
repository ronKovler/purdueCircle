package com.purduecircle.backend.repository;

import com.purduecircle.backend.models.Topic;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface TopicRepository extends JpaRepository<Topic, Integer> {

    Topic findByTopicName(String topic_name);
    List<Topic> findAll();
    
}