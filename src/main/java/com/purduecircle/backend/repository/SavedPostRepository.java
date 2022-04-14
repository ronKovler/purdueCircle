package com.purduecircle.backend.repository;

import com.purduecircle.backend.models.*;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface SavedPostRepository extends JpaRepository<SavedPost, Integer> {

    List<SavedPost> findAllByUser(User user);
    SavedPost findByUserAndSavedPost(User user, Post post);

}