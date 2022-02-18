package com.purduecircle.backend.models;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;
import java.util.List;
@Repository

public interface UserRepository extends JpaRepository<User, Integer> {

	List<User> findByEmail(String email);
	List<User> findByUsername(String username);

}