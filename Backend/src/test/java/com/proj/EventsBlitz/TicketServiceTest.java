package com.proj.EventsBlitz;



import com.proj.EventsBlitz.models.Ticket;
import com.proj.EventsBlitz.repositories.TicketRepository;
import com.proj.EventsBlitz.services.TicketService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

public class TicketServiceTest {

    @Mock
    private TicketRepository ticketRepository;

    @InjectMocks
    private TicketService ticketService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testGetAllTickets() {
        List<Ticket> expectedTickets = Arrays.asList(new Ticket(), new Ticket());
        when(ticketRepository.findAll()).thenReturn(expectedTickets);

        List<Ticket> result = ticketService.getAllTickets();

        assertEquals(expectedTickets.size(), result.size());
    }

    @Test
    void testGetTicketsByEventId() {
        int eventId = 1;
        List<Ticket> expectedTickets = Arrays.asList(new Ticket(), new Ticket());
        when(ticketRepository.findByEvent_EventID(eventId)).thenReturn(expectedTickets);

        List<Ticket> result = ticketService.getTicketsByEventId(eventId);

        assertEquals(expectedTickets.size(), result.size());
    }
}
