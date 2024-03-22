package com.proj.EventsBlitz.controllers;

import com.proj.EventsBlitz.models.Seat;
import com.proj.EventsBlitz.models.Event;
import com.proj.EventsBlitz.services.EventService;
import com.proj.EventsBlitz.services.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;


@RestController
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from the React app
@RequestMapping("/api/seats")
public class SeatController {

    private final SeatService seatService;
    private final EventService eventService;

    @Autowired
    public SeatController(SeatService seatService, EventService eventService) {
        this.seatService = seatService;
        this.eventService = eventService;
    }

    @GetMapping("/byEventID/{eventID}")
    public List<Seat> getSeatsByEventID(@PathVariable int eventID) {
        return seatService.getSeatsByEventID(eventID);
    }

    @GetMapping("/byTypeAndEvent/{seatType}/{eventID}")
    public List<Seat> getSeatsByTypeAndEventID(@PathVariable String seatType, @PathVariable int eventID) {
        return seatService.getSeatsByTypeAndEventID(seatType, eventID);
    }

    @GetMapping("/byPriceAndEvent/{price}/{eventID}")
    public List<Seat> getSeatsByPriceAndEventID(@PathVariable BigDecimal price, @PathVariable int eventID) {
        return seatService.getSeatsByPriceAndEventID(price, eventID);
    }

    @PostMapping("/addSeat")
    public Seat addSeat(@RequestBody Seat seat) {
        Event event = seat.getEvent();
        if (event == null || event.getEventID() == 0) {
            throw new IllegalArgumentException("Event information is required.");
        }
        int eventID = event.getEventID();
        Event existingEvent = eventService.getEventById(eventID) 
        .orElseThrow(() -> new RuntimeException("Event not found for ID: " + eventID));
        if (existingEvent == null) { 
            throw new IllegalArgumentException("Event with ID " + eventID + " does not exist.");
        }
        seat.setEvent(existingEvent);
        return seatService.addSeat(seat);
    }

}