// SearchEvents.js
import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';

const SearchEvents = ({ isAdmin, onCreateEvent }) => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCreateEventForm, setShowCreateEventForm] = useState(false);
    const [newEventFormData, setNewEventFormData] = useState({
        eventName: '',
        eventDescription: '',
        eventDate: '',
        eventTime: '',
        eventLocation: '',
        ticketPrice: '',
        totalTickets: '',
        availableTickets: '',
        imageUrl: ''
    });

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

    const handleCreateEvent = () => {
        setShowCreateEventForm(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewEventFormData({
            ...newEventFormData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/events/createEvent', newEventFormData);
            setShowCreateEventForm(false);
            setNewEventFormData({
                eventName: '',
                eventDescription: '',
                eventDate: '',
                eventTime: '',
                eventLocation: '',
                ticketPrice: '',
                totalTickets: '',
                availableTickets: '',
                imageUrl: ''
            });
            fetchEvents(); // Refresh the events list after creating a new event
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    const handleDeleteEvent = async (eventId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this event?");
        if (confirmDelete) {
            try {
                await api.delete(`/events/${eventId}`);
                fetchEvents(); // Refresh the events list after deleting an event
            } catch (error) {
                console.error('Error deleting event:', error);
            }
        }
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
            {isAdmin && (
                <div className="container-lg mt-4">
                    <div className="text-right">
                        <button onClick={handleCreateEvent} className="btn btn-primary mr-3">Create Event</button>
                    </div>
                </div>
            )}
            {showCreateEventForm && (
                <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Create Event</h5>
                                <button type="button" className="close" onClick={() => setShowCreateEventForm(false)}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label>Event Name</label>
                                        <input type="text" className="form-control" name="eventName" value={newEventFormData.eventName} onChange={handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Event Description</label>
                                        <input type="text" className="form-control" name="eventDescription" value={newEventFormData.eventDescription} onChange={handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Event Date</label>
                                        <input type="date" className="form-control" name="eventDate" value={newEventFormData.eventDate} onChange={handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Event Time</label>
                                        <input type="time" className="form-control" name="eventTime" value={newEventFormData.eventTime} onChange={handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Event Location</label>
                                        <input type="text" className="form-control" name="eventLocation" value={newEventFormData.eventLocation} onChange={handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Ticket Price</label>
                                        <input type="number" className="form-control" name="ticketPrice" value={newEventFormData.ticketPrice} onChange={handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Total Tickets</label>
                                        <input type="number" className="form-control" name="totalTickets" value={newEventFormData.totalTickets} onChange={handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Available Tickets</label>
                                        <input type="number" className="form-control" name="availableTickets" value={newEventFormData.availableTickets} onChange={handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Image URL</label>
                                        <input type="text" className="form-control" name="imageUrl" value={newEventFormData.imageUrl} onChange={handleChange} required />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="container-lg p-5" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', overflowY: 'auto', maxHeight: '600px' }}>
                {events.map((event) => (
                    <div className="card" key={event.eventID} onClick={() => handleEventClick(event)} style={{ cursor: 'pointer' }}>
                        <img src={event.imageUrl} className="card-img-top" alt={event.eventName} style={{ objectFit: 'cover', height: '200px' }} />
                        <div className="card-body">
                            <h5 className="card-title">{event.eventName}</h5>
                            <p className="card-text">Date: {new Date(event.eventDate).toLocaleDateString()}</p>
                            {isAdmin && (
                                <button onClick={() => handleDeleteEvent(event.eventID)} className="btn btn-danger">Delete</button>
                            )}
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
                                <img src={selectedEvent.imageUrl} alt={selectedEvent.eventName} style={{ width: '100%', height: 'auto', marginBottom: '10px' }} />
                                <h5 className="text-center"><span style={{ fontWeight: 'bold', color: 'purple' }}>{selectedEvent.eventName}</span></h5>
                                <p style={{ lineHeight: '1.5' }}>
                                    <span style={{ color: 'purple', fontWeight: 'bold' }}>Description: </span>{selectedEvent.eventDescription}<br />
                                    <span style={{ color: 'purple', fontWeight: 'bold' }}>Date: </span>{new Date(selectedEvent.eventDate).toLocaleDateString()}<br />
                                    <span style={{ color: 'purple', fontWeight: 'bold' }}>Time: </span>{selectedEvent.eventTime}<br />
                                    <span style={{ color: 'purple', fontWeight: 'bold' }}>Location: </span>{selectedEvent.eventLocation}<br />
                                    <span style={{ color: 'purple', fontWeight: 'bold' }}>Ticket Price: </span>{selectedEvent.ticketPrice}<br />
                                    <span style={{ color: 'purple', fontWeight: 'bold' }}>Total Tickets: </span>{selectedEvent.totalTickets}<br />
                                    <span style={{ color: 'purple', fontWeight: 'bold' }}>Available Tickets: </span>{selectedEvent.availableTickets}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchEvents;
