package com.proj.EventsBlitz.services;

import com.proj.EventsBlitz.models.Seat;
import com.proj.EventsBlitz.repositories.SeatRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

public class SeatServiceTest {

    @Mock
    private SeatRepository seatRepository;

    @InjectMocks
    private SeatService seatService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testGetSeatsByEventID() {
        int eventId = 1;
        List<Seat> expectedSeats = Arrays.asList(new Seat(), new Seat());
        when(seatRepository.findByEvent_EventID(eventId)).thenReturn(expectedSeats);

        List<Seat> result = seatService.getSeatsByEventID(eventId);

        assertEquals(expectedSeats.size(), result.size());
    }

    @Test
    void testGetSeatsByTypeAndEventID() {
        String seatType = "VIP";
        int eventId = 1;
        List<Seat> expectedSeats = Arrays.asList(new Seat(), new Seat());
        when(seatRepository.findBySeatTypeAndEvent_EventID(seatType, eventId)).thenReturn(expectedSeats);

        List<Seat> result = seatService.getSeatsByTypeAndEventID(seatType, eventId);

        assertEquals(expectedSeats.size(), result.size());
    }

    @Test
    void testGetSeatsByPriceAndEventID() {
        BigDecimal price = BigDecimal.valueOf(100.00);
        int eventId = 1;
        List<Seat> expectedSeats = Arrays.asList(new Seat(), new Seat());
        when(seatRepository.findByPriceAndEvent_EventID(price, eventId)).thenReturn(expectedSeats);

        List<Seat> result = seatService.getSeatsByPriceAndEventID(price, eventId);

        assertEquals(expectedSeats.size(), result.size());
    }
}

