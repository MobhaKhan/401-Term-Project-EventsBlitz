package com.proj.EventsBlitz.services;

import com.proj.EventsBlitz.models.Event;
import com.proj.EventsBlitz.repositories.EventRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class EventServiceTest {

    private EventRepository eventRepository = mock(EventRepository.class);
    private EventService eventService;

    @BeforeEach
    void setUp() {
        eventService = new EventService(eventRepository);
    }

    @Test
    void whenGetAllEventsCalled_thenRepositoryFindAllCalled() {
        Event event1 = new Event(); // Assume Event has a no-args constructor
        Event event2 = new Event();
        when(eventRepository.findAll()).thenReturn(Arrays.asList(event1, event2));
        
        List<Event> events = eventService.getAllEvents();
        
        assertEquals(2, events.size());
        verify(eventRepository).findAll();
    }

}
