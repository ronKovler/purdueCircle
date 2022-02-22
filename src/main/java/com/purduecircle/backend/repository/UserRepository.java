package com.purduecircle.backend.repository;

import com.purduecircle.backend.models.User;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;
import java.util.List;
@Repository

public interface UserRepository extends JpaRepository<User, Integer> {

	User findByEmail(String email);
	User findByUsername(String username);
	User findByEmailEqualsAndPasswordEquals(String email, String password);

}