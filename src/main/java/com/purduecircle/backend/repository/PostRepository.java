package com.purduecircle.backend.repository;

import com.purduecircle.backend.models.Post;
import com.purduecircle.backend.models.Topic;
import com.purduecircle.backend.models.User;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;
@Repository

public interface PostRepository extends JpaRepository<Post, Integer> {

    List<Post> findAllByUser(User user);
    List<Post> findAllByTopic(Topic topic);
    Post findByPostID(int postID);

    List<Post> findByTimePostedGreaterThanEqualOrderByTimePostedDesc(Timestamp yesterday);
}
