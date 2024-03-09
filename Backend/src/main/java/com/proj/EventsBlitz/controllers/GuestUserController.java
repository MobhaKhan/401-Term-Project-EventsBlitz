package com.proj.EventsBlitz.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.proj.EventsBlitz.models.GuestUser;
import com.proj.EventsBlitz.services.GuestUserService;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/guestUsers")
public class GuestUserController {

    private final GuestUserService guestUserService;

    @Autowired
    public GuestUserController(GuestUserService guestUserService) {
        this.guestUserService = guestUserService;
    }

    @GetMapping("/getAllGuestUsers")
    public String getAllGuestUsers() {
        List<GuestUser> guestUsers = guestUserService.getAllGuestUsers();
        return guestUsers.toString();
    }

    @GetMapping("/{id}")
    public String getGuestUserById(@PathVariable int id) {
        return guestUserService.getGuestUserById(id).toString();
    }

    @GetMapping
    public String getGuestUserByIdBody(@RequestBody @NotNull JsonNode jsonNode) {
        int id = jsonNode.get("id").asInt();

        return guestUserService.getGuestUserById(id).toString();
    }

}

