package com.purduecircle.backend.repository;

import com.purduecircle.backend.models.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;
import java.util.List;
@Repository

public interface PostRepository extends JpaRepository<Post, Integer> {

    List<Post> findByUserID(int userid);

}