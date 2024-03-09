package com.proj.EventsBlitz.services;

import com.proj.EventsBlitz.models.GuestUser;
import com.proj.EventsBlitz.repositories.GuestUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GuestUserService {

    private final GuestUserRepository guestUserRepository;

    @Autowired
    public GuestUserService(GuestUserRepository guestUserRepository) {
        this.guestUserRepository = guestUserRepository;
    }

    public List<GuestUser> getAllGuestUsers() {
        return guestUserRepository.findAll();
    }

    public Optional<GuestUser> getGuestUserById(int id) {
        return guestUserRepository.findById(id);
    }

    public GuestUser createGuestUser(GuestUser guestUser) {
        return guestUserRepository.save(guestUser);
    }

    public void deleteGuestUser(int id) {
        guestUserRepository.deleteById(id);
    }
}