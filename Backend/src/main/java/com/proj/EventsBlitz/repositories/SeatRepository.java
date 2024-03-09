package com.proj.EventsBlitz.repositories;

import com.proj.EventsBlitz.models.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import java.math.BigDecimal;
import java.util.List;

public interface SeatRepository extends JpaRepository<Seat, String> {
    List<Seat> findByEvent_EventID(int eventID);
    List<Seat> findBySeatTypeAndEvent_EventID(String seatType, int eventID);
    List<Seat> findByPriceAndEvent_EventID(BigDecimal price, int eventID);
}
