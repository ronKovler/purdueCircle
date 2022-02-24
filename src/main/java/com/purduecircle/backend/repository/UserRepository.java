package com.purduecircle.backend.repository;

import com.purduecircle.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

@Repository

public interface UserRepository extends JpaRepository<User, Integer> {

	User findByEmailEquals(String email);
	User findByUsername(String username);
	User findByEmailEqualsAndPasswordEquals(String email, String password);
	User findByUserID(long userID);

}