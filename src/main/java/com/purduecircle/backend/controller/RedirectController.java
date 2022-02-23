package com.purduecircle.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.net.URL;

@RestController

public class RedirectController {

    //@RequestMapping("/")
    public ResponseEntity<Void> redirect() {
        return ResponseEntity.status(HttpStatus.FOUND).location(
                URI.create("https://main.dmztjxlx50f6b.amplifyapp.com/")).build();
    }
}
