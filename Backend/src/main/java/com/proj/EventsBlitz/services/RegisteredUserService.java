package com.proj.EventsBlitz.services;

import com.proj.EventsBlitz.models.RegisteredUser;
import com.proj.EventsBlitz.repositories.RegisteredUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RegisteredUserService {

    private final RegisteredUserRepository registeredUserRepository;

    @Autowired
    public RegisteredUserService(RegisteredUserRepository registeredUserRepository) {
        this.registeredUserRepository = registeredUserRepository;
    }

    public List<RegisteredUser> getAllRegisteredUsers() {
        return registeredUserRepository.findAll();
    }

    public Optional<RegisteredUser> getRegisteredUserById(int id) {
        return registeredUserRepository.findById(id);
    }

    public RegisteredUser createRegisteredUser(RegisteredUser registeredUser) {
        return registeredUserRepository.save(registeredUser);
    }

    public void deleteRegisteredUser(int id) {
        registeredUserRepository.deleteById(id);
    }
}