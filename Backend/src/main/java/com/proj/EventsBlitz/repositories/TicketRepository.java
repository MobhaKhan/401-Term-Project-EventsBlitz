package com.proj.EventsBlitz.repositories;

import com.proj.EventsBlitz.models.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Integer> {

    List<Ticket> findByEvent_EventID(int eventId);

    // You can define custom query methods if needed
}
