// src/main/java/com/sample/example/controller/UserController.java
package com.proj.EventsBlitz.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.proj.EventsBlitz.models.User;
import com.proj.EventsBlitz.services.UserService;
import jakarta.servlet.http.HttpServletResponse;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/getAllUsers")
    public String getAllUsers() {
        List<User> users = userService.getAllUsers();
        return users.toString();
    }

    @GetMapping("/{id}")
    public String getUserByIdPath(@PathVariable int id) {
        return userService.getUserById(id).toString();
    }

    @GetMapping
    public String getUserByIdBody(@RequestBody @NotNull JsonNode jsonNode) {
        int id = jsonNode.get("id").asInt();

        return userService.getUserById(id).toString();
    }

    @PostMapping("/loginRegisteredUser")
    public ResponseEntity<Map<String, String>> loginRegisteredUser(@RequestBody @NotNull JsonNode jsonNode, HttpServletResponse httpServletResponse) {
        String email = jsonNode.get("email").asText();
        String password = jsonNode.get("password").asText();

        Map<String, String> loginResult = userService.loginRegisteredUser(httpServletResponse, email, password);

        // You can check if there's an error and handle it accordingly
        if (loginResult.containsKey("error")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(loginResult);
        }

        // If successful, return the login result
        return ResponseEntity.ok(loginResult);
    }

    @PostMapping("/loginAdmin")
    public ResponseEntity<Map<String, String>> loginAdmin(@RequestBody @NotNull JsonNode jsonNode, HttpServletResponse httpServletResponse) {
        String email = jsonNode.get("email").asText();
        String password = jsonNode.get("password").asText();

        Map<String, String> loginResult = userService.loginAdmin(httpServletResponse, email, password);

        // You can check if there's an error and handle it accordingly
        if (loginResult.containsKey("error")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(loginResult);
        }

        // If successful, return the login result
        return ResponseEntity.ok(loginResult);
    }

    @PostMapping("/createRegisteredUser")
    public User createRegisteredUser(@RequestBody @NotNull JsonNode jsonNode) {
        //For generic users at first
        String username = jsonNode.get("username").asText();
        String email = jsonNode.get("email").asText();
        String address = jsonNode.get("address").asText();
        String type = jsonNode.get("type").asText();

        //For registered users
        String password = jsonNode.get("password").asText();
        String creditCard = jsonNode.get("creditCard").asText();

        User user = new User(username, address, email, type);

        return userService.createRegisteredUser(user, password, creditCard);
    }

    @PostMapping("/createAdmin")
    public User createAdmin(@RequestBody @NotNull JsonNode jsonNode) {
        //For generic users at first
        String username = jsonNode.get("username").asText();
        String email = jsonNode.get("email").asText();
        String address = jsonNode.get("address").asText();
        String type = jsonNode.get("type").asText();

        //For Admins
        String password = jsonNode.get("password").asText();

        User user = new User(username, address, email, type);

        return userService.createAdmin(user, password);
    }
    @PostMapping("/createGuestUser")
    public User createGuestUser(@RequestBody @NotNull JsonNode jsonNode) {
        //For generic users at first
        String username = jsonNode.get("username").asText();
        String email = jsonNode.get("email").asText();
        String address = jsonNode.get("address").asText();
        String type = jsonNode.get("type").asText();


        User user = new User(username, address, email, type);

        return userService.createGuestUser(user);
    }

    @DeleteMapping("/{id}")
    public void deleteRegisteredUser(@PathVariable int id) {
        userService.deleteRegisteredUser(id);
    }

    @DeleteMapping("/deleteAdmin/{id}")
    public void deleteAdmin(@PathVariable int id) {
        userService.deleteAdmin(id);
    }

    @DeleteMapping("/deleteGuestUser/{id}")
    public void deleteGuestUser(@PathVariable int id) {
        userService.deleteGuestUser(id);
    }

}