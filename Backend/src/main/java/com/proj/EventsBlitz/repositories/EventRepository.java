package com.proj.EventsBlitz.repositories;

import com.proj.EventsBlitz.models.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Integer> {
    // Custom database operations if needed
}
