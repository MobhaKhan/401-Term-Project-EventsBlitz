package com.proj.EventsBlitz.repositories;

import com.proj.EventsBlitz.models.GuestUser;
import org.springframework.data.jpa.repository.JpaRepository;


public interface GuestUserRepository extends JpaRepository<GuestUser, Integer> {
    // You can add custom queries here if needed
}