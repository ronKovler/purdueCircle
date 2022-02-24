package com.purduecircle.backend.repository;

import com.purduecircle.backend.models.Post;
import com.purduecircle.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;
import java.util.List;
@Repository

public interface PostRepository extends JpaRepository<Post, Integer> {

    List<Post> findByUser(User user);
    Post findByPostID(int postID);


    List<Post> findBy();
}
