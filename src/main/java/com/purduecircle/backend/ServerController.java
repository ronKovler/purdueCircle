package com.purduecircle.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ServerController {
    @GetMapping("/checkConnection")
    public String testConnection() {
        return "Connection Successful";
    }
}
