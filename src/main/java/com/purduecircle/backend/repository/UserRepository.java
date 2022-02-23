package com.purduecircle.backend.repository;

import com.purduecircle.backend.newModels.User;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

@Repository

public interface UserRepository extends JpaRepository<User, Integer> {

	User findByEmail(String email);
	User findByUsername(String username);
	User findByEmailEqualsAndPasswordEquals(String email, String password);
	User findByUserID(int userID);

}