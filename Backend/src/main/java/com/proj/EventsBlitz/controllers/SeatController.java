package com.proj.EventsBlitz.controllers;

import com.proj.EventsBlitz.models.Seat;
import com.proj.EventsBlitz.services.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/seats")
public class SeatController {

    private final SeatService seatService;

    @Autowired
    public SeatController(SeatService seatService) {
        this.seatService = seatService;
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
}
