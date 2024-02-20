package com.proj.EventsBlitz.services;


import com.proj.EventsBlitz.models.*;
import com.proj.EventsBlitz.repositories.*;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {


    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}