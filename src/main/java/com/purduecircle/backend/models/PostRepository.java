package com.purduecircle.backend.models;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;
import java.util.List;
@Repository

public interface PostRepository extends JpaRepository<Post, Integer> {

    List<Post> findByUserID(int userid);

}
