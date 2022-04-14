package com.purduecircle.backend.repository;

import com.purduecircle.backend.models.*;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface CommentRepository extends JpaRepository<Comment, Integer> {

    List<Comment> findAllByPost(Post post);

    @Query("SELECT new com.purduecircle.backend.models.CommentDTO(c.user.userID, c.post.postID, c.content, c.username) " +
            "FROM Comment c WHERE c.post = :post AND c.user NOT IN " +
            "(SELECT b.blockedUser FROM UserBlocked b WHERE b.user = :user) ORDER BY c.timePosted DESC")
    List<CommentDTO> getAllPostCommentsWithoutBlocked(@Param("post") Post post, @Param("user") User user);

    @Query("SELECT new com.purduecircle.backend.models.CommentDTO(c.user.userID, c.post.postID, c.content, c.username) " +
            "FROM Comment c WHERE c.post = :post ORDER BY c.timePosted DESC")
    List<CommentDTO> getAllPostComments(@Param("post") Post post);
}
