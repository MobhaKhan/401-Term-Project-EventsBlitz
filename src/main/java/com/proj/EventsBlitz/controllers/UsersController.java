package com.proj.EventsBlitz.controllers;
import com.proj.EventsBlitz.models.User;
import com.proj.EventsBlitz.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@CrossOrigin
@RequestMapping("/api/users")
public class UsersController {

    private final UserService userService;

    @Autowired
    public UsersController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/getAllUsers")
    public String getAllUsers() {
        List<User> users = userService.getAllUsers();
        return users.toString();
    }
}



    