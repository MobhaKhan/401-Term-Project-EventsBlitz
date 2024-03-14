import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

const SearchEvents = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await api.get('/events/getAllEvents');
            setEvents(response.data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const handleEventClick = (event) => {
        setSelectedEvent(event);
    };

    const handleCloseModal = () => {
        setSelectedEvent(null);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <div className="container-lg bg-primary-subtle rounded-4">
                <h2 className="text-center p-5">Search Events</h2>
            </div>
            <div className="container-lg p-5 mt-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', overflowY: 'auto', maxHeight: '600px' }}>
                {events.map((event) => (
                    <div className="card" key={event.eventID} onClick={() => handleEventClick(event)} style={{ cursor: 'pointer' }}>
                        <img src={event.image_url} className="card-img-top" alt={event.eventName} style={{ objectFit: 'cover', height: '200px' }} />
                        <div className="card-body">
                            <h5 className="card-title">{event.eventName}</h5>
                            <p className="card-text">Date: {new Date(event.eventDate).toLocaleDateString()}</p>
                        </div>
                    </div>
                ))}
            </div>
            {selectedEvent && (
                <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" onClick={handleCloseModal}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <img src={selectedEvent.image_url} alt={selectedEvent.eventName} style={{ width: '100%', height: 'auto', marginBottom: '10px' }} />
                                <h5 className="text-center">{selectedEvent.eventName}</h5>
                                <p>{selectedEvent.eventDescription}</p>
                                <p>Date: {new Date(selectedEvent.eventDate).toLocaleDateString()}</p>
                                <p>Time: {selectedEvent.eventTime}</p>
                                <p>Location: {selectedEvent.eventLocation}</p>
                                <p>Ticket Price: {selectedEvent.ticketPrice}</p>
                                <p>Total Tickets: {selectedEvent.totalTickets}</p>
                                <p>Available Tickets: {selectedEvent.availableTickets}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchEvents;
