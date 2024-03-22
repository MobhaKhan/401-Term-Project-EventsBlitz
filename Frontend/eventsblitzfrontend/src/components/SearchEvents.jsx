import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import { Alert } from 'react-bootstrap';

const SearchEvents = ({ isAdmin, onCreateEvent }) => {
    const navigate = useNavigate();
    const [showLoginAlert, setShowLoginAlert] = useState(false);
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
    const [showAddSeatForm, setShowAddSeatForm] = useState(false);
    const [newEventID, setNewEventID] = useState(null); // State to store the new event ID after creation
    const [addSeatFormData, setAddSeatFormData] = useState({
        seatLetterLabel: '', // Starting letter label for seats
        typeOfSeat: '',
        price: '',
        numberOfSeats: 0
    });
    const seatTypesWithPrices = {
        "Regular": 50,
        "Business-Class": 100,
        "Comfort": 75
      };

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

    const navigateToBooking = (event) => {
        navigate('/booking/detail', { state: { event: event } });
    };

    const handleBookEventClick = () => {
        const userType = sessionStorage.getItem('type');
        if (userType === 'Admin') {
            alert('You are an Admin and cannot book events. Please sign in as a registered user to book events.');
        } else {
            if (sessionStorage.getItem('isAuthenticated') === 'true') {
                navigateToBooking(selectedEvent);
            } else {
                setShowLoginAlert(true);
            }
        }
    };

    useEffect(() => {
        if (newEventID !== null) {
          console.log("New Event ID is now set to:", newEventID);
        }
    }, [newEventID]);
    
    const handleAddSeats = (e, eventID) => {
        e.stopPropagation(); // Prevent event from bubbling up
        setNewEventID(eventID); 
        setShowAddSeatForm(true); 
    };

    const handleCloseModal = () => {
        setSelectedEvent(null);
        setShowLoginAlert(false);
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

    const handleAddSeatChange = (e) => {
        const { name, value } = e.target;
        setAddSeatFormData({
            ...addSeatFormData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newEventResponse = await api.post('/events/createEvent', newEventFormData);
            console.log(newEventResponse.data.eventID);
            setShowCreateEventForm(false); // Close the create event modal
            // Clear form data
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
            fetchEvents(); // Refresh the events list
        } catch (error) {
            console.error('Error creating event or seats:', error);
        }
    };
    

    const handleDeleteEvent = async (e, eventId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this event?");
        if (confirmDelete) {
            try {
                e.stopPropagation(); // Prevent event from bubbling up
                await api.delete(`/events/${eventId}`);
                setSelectedEvent(null);
                fetchEvents();
            } catch (error) {
                console.error('Error deleting event:', error);
            }
        }
    };

    const handleTypeOfSeatChange = (e) => {
        const selectedType = e.target.value;
        setAddSeatFormData({
          ...addSeatFormData,
          typeOfSeat: selectedType,
          price: seatTypesWithPrices[selectedType], // Automatically set the price based on seat type
        });
    };

    const handleAddSeatsSubmit = async (e) => {
        e.preventDefault();
        if (!newEventID) {
            console.error('No new event ID to add seats to.');
            return;
        }

        try {
            let currentSeatLetter = addSeatFormData.seatLetterLabel;
            for (let i = 1; i <= addSeatFormData.numberOfSeats; i++) {
                const seatData = {
                    seatNumber: `${currentSeatLetter}${i}`,
                    event: { eventID: newEventID },
                    seatType: addSeatFormData.typeOfSeat,
                    price: addSeatFormData.price
                };
                await api.post('/seats/addSeat', seatData);
            }
            setShowAddSeatForm(false); // Close the add seats modal
        } catch (error) {
            console.error('Error adding seats:', error);
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
            {showAddSeatForm && (
                <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add Seats</h5>
                        <button type="button" className="close" onClick={() => setShowAddSeatForm(false)}>
                        <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleAddSeatsSubmit}>
                        <div className="form-group">
                            <label>Seat Letter Label</label>
                            <input type="text" className="form-control" name="seatLetterLabel" value={addSeatFormData.seatLetterLabel} onChange={handleAddSeatChange} required />
                        </div>
                        <div className="form-group">
                            <label>Type of Seat</label>
                            <select className="form-control" name="typeOfSeat" value={addSeatFormData.typeOfSeat} onChange={handleTypeOfSeatChange} required>
                            <option value="">Select Seat Type</option>
                            <option value="Regular">Regular</option>
                            <option value="Business-Class">Business-Class</option>
                            <option value="Comfort">Comfort</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Price</label>
                            <input type="number" className="form-control" name="price" value={addSeatFormData.price} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Number of Seats</label>
                            <input type="number" className="form-control" name="numberOfSeats" value={addSeatFormData.numberOfSeats} onChange={handleAddSeatChange} min="1" required />
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
                                <div>
                                    <button onClick={(e) => handleDeleteEvent(e, event.eventID)} className="btn btn-danger">Delete</button>
                                    <button onClick={(e) => handleAddSeats(e, event.eventID)} className="btn btn-primary">Add Seats</button>
                                </div>
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
                                    <span style={{ color: 'purple', fontWeight: 'bold' }}>Ticket Price: </span>${selectedEvent.ticketPrice}.00<br />
                                    <span style={{ color: 'purple', fontWeight: 'bold' }}>Total Tickets: </span>{selectedEvent.totalTickets}<br />
                                    <span style={{ color: 'purple', fontWeight: 'bold' }}>Available Tickets: </span>{selectedEvent.availableTickets}
                                </p>
                                <div className="text-center">
                                    {showLoginAlert && <Alert variant="danger" className="mt-3">You must login first!</Alert>}
                                    <button className="btn btn-primary" onClick={handleBookEventClick}>Book Event</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchEvents;