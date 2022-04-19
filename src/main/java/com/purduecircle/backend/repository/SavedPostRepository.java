package com.purduecircle.backend.repository;

import com.purduecircle.backend.models.*;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface SavedPostRepository extends JpaRepository<SavedPost, Integer> {

    List<SavedPost> findAllByUser(User user);

    @Query("SELECT p.savedPost FROM SavedPost p WHERE p.user = :user ORDER BY p.savedPost.timePosted DESC")
    List<Post> findUsersSavedPost(@Param("user") User user);
    SavedPost findByUserAndSavedPost(User user, Post post);

}