package com.proj.EventsBlitz.controllers;

import com.proj.EventsBlitz.models.Ticket;
import com.proj.EventsBlitz.services.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/tickets")
public class TicketController {

    private final TicketService ticketService;

    @Autowired
    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @GetMapping("/all")
    public List<Ticket> getAllTickets() {
        return ticketService.getAllTickets();
    }

    @GetMapping("/byEvent/{eventId}")
    public List<Ticket> getTicketsByEventId(@PathVariable int eventId) {
        return ticketService.getTicketsByEventId(eventId);
    }
}
