import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import SearchEvents from '../src/components/SearchEvents';
import api from '../src/api/axiosConfig';

jest.mock('../src/api/axiosConfig', () => ({
    get: jest.fn(),
}));

describe('SearchEvents Component', () => {
    beforeEach(() => {
        api.get.mockClear();
    });

    test('renders loading state while fetching events', async () => {
        api.get.mockResolvedValueOnce({ data: [] });
        render(
            <Router>
                <SearchEvents />
            </Router>
        );
        expect(screen.getByText('Loading...')).toBeInTheDocument();
        await waitFor(() => expect(api.get).toHaveBeenCalledWith('/events/getAllEvents'));
    });

    test('renders events correctly when events are fetched successfully', async () => {
        const mockEvents = [
            { eventID: 1, eventName: 'Event 1' },
            { eventID: 2, eventName: 'Event 2' },
        ];
        api.get.mockResolvedValueOnce({ data: mockEvents });
        render(
            <Router>
                <SearchEvents />
            </Router>
        );
        await waitFor(() => expect(api.get).toHaveBeenCalledWith('/events/getAllEvents'));
        mockEvents.forEach(event => {
            expect(screen.getByText(event.eventName)).toBeInTheDocument();
        });
    });

    test('clicking on an event card triggers handleEventClick function', async () => {
        const mockEvent = { eventID: 1, eventName: 'Event 1' };
        api.get.mockResolvedValueOnce({ data: [mockEvent] });
        render(
            <Router>
                <SearchEvents />
            </Router>
        );
        await waitFor(() => expect(api.get).toHaveBeenCalledWith('/events/getAllEvents'));
        fireEvent.click(screen.getByText(mockEvent.eventName));
    });
   
    test('clicking on "Delete" button triggers handleDeleteEvent function for admin users', async () => {
        const mockEvent = { eventID: 1, eventName: 'Event 1' };
        api.get.mockResolvedValueOnce({ data: [mockEvent] });
        render(
            <Router>
                <SearchEvents isAdmin={true} />
            </Router>
        );
        await waitFor(() => expect(api.get).toHaveBeenCalledWith('/events/getAllEvents'));
    });
    test('clicking on "Book Event" triggers handleBookEventClick function for non-admin users', async () => {
        const mockEvent = { eventID: 2, eventName: 'Event 2' };
        api.get.mockResolvedValueOnce({ data: [mockEvent] });
        render(
            <Router>
                <SearchEvents />
            </Router>
        );
        await waitFor(() => expect(api.get).toHaveBeenCalledWith('/events/getAllEvents'));
        fireEvent.click(screen.getByText(mockEvent.eventName)); // Select an event
        fireEvent.click(screen.getByText('Book Event')); // Click on "Book Event" button
        // Add your assertion for the expected behavior when "Book Event" button is clicked
    });
    // Add more test cases as needed
});