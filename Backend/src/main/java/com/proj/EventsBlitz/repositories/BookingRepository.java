package com.proj.EventsBlitz.repositories;

import com.proj.EventsBlitz.models.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {
    // Custom database operations if needed
}
