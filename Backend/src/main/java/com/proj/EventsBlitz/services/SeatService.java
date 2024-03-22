package com.proj.EventsBlitz.services;

import com.proj.EventsBlitz.models.Seat;
import com.proj.EventsBlitz.repositories.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
@Service
public class SeatService {

    private final SeatRepository seatRepository;

    @Autowired
    public SeatService(SeatRepository seatRepository) {
        this.seatRepository = seatRepository;
    }

    public List<Seat> getSeatsByEventID(int eventID) {
        return seatRepository.findByEvent_EventID(eventID);
    }

    public List<Seat> getSeatsByTypeAndEventID(String seatType, int eventID) {
        return seatRepository.findBySeatTypeAndEvent_EventID(seatType, eventID);
    }

    public List<Seat> getSeatsByPriceAndEventID(BigDecimal price, int eventID) {
        return seatRepository.findByPriceAndEvent_EventID(price, eventID);
    }

    public Seat addSeat(Seat seat) {
        return seatRepository.save(seat);
    }
}