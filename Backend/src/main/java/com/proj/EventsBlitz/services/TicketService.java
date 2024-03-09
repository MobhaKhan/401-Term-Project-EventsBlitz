package com.proj.EventsBlitz.services;

import com.proj.EventsBlitz.models.Ticket;
import com.proj.EventsBlitz.repositories.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;

    @Autowired
    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    public List<Ticket> getTicketsByEventId(int eventId) {
        return ticketRepository.findByEvent_EventID(eventId);
    }
}
