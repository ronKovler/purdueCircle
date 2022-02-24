package com.purduecircle.backend.repository;

import com.purduecircle.backend.models.Post;
import com.purduecircle.backend.models.Reaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReactionRepository extends JpaRepository<Reaction, Integer> {

    //long countAllBy

}
