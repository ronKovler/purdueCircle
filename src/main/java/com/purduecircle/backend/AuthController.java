package com.purduecircle.backend;

import com.purduecircle.backend.models.User;
import com.purduecircle.backend.models.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/api/auth/")
public class AuthController {
    @Autowired
    UserRepository userRepository;


    @PostMapping("login/")
    public int tryLogin(@RequestBody User newUser) {
        List<User> users = userRepository.findAll();
        for (User check : users) {
            if (check.equals(newUser)) {
                return check.getUserID();
            }
        }

        return -1;
    }
}
