package com.purduecircle.backend.repository;

import com.purduecircle.backend.models.Post;
import com.purduecircle.backend.models.User;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
@Repository

public interface PostRepository extends JpaRepository<Post, Integer> {


    List<Post> findByUser(User user, Sort sortbytime);                                        //Query for userline
    List<Post> findByTopic(String topic, Sort sortbytime);                                    //Query for topicline

    List<Post> findByTimePostedAfter(Timestamp yesterday, Sort sortbytime, Sort sortbylikes); //Query for hot timeline

    List<Post> findByTopicInOrUserIn(List<String> topics, List<User> users, Sort sortbytime); //Query for personalized timeline

}
