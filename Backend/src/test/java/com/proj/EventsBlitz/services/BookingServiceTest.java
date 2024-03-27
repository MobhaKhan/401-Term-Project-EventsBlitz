package com.proj.EventsBlitz.services;

import com.proj.EventsBlitz.models.Booking;
import com.proj.EventsBlitz.repositories.BookingRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class BookingServiceTest {

    private BookingRepository bookingRepository;
    private BookingService bookingService;

    @BeforeEach
    public void setUp() {
        // Mock the BookingRepository using Mockito
        bookingRepository = mock(BookingRepository.class);

        // Create a BookingService with the mocked repository
        bookingService = new BookingService(bookingRepository);
    }

    @Test
    public void testGetAllBookings() {
        // Arrange: Create some dummy bookings and set up the mock behavior
        Booking booking1 = new Booking(); // You might want to set some fields here
        Booking booking2 = new Booking(); // You might want to set some fields here
        when(bookingRepository.findAll()).thenReturn(Arrays.asList(booking1, booking2));

        // Act: Call the method to test
        List<Booking> bookings = bookingService.getAllBookings();

        // Assert: Check the result is as expected
        assertEquals(2, bookings.size(), "The service should return two bookings.");
    }
}

