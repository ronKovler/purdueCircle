package com.purduecircle.backend.repository;

import com.purduecircle.backend.models.Post;
import com.purduecircle.backend.models.Reaction;
import com.purduecircle.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReactionRepository extends JpaRepository<Reaction, Integer> {
        Reaction getReactionByPostAndUser(Post post, User user);
}
