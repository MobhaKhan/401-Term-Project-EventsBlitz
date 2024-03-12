import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

const SearchEvents = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null); // Define selectedEvent state
    const [apiResponse, setApiResponse] = useState('');
    const navigate = useNavigate();

    const fetchEvents = async () => {
        try {
            const response = await api.get('/events/getAllEvents');
            setEvents(response.data);
            setApiResponse(JSON.stringify(response.data, null, 2));
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleEventClick = (event) => {
        if (sessionStorage.getItem('isAuthenticated') === 'true') {
            setSelectedEvent(event); // Now this function call is valid as setSelectedEvent is defined
            navigate('/event/detail', { state: { event: event } });
        } else {
            navigate('/login');
        }
    }

    return (
        <div>
            <div className="container-lg bg-primary-subtle rounded-4">
                <h2 className="text-center p-5">Search Events</h2>
            </div>
            <div className="container-lg bg-warning-subtle rounded-4 p-5 mt-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', overflowY: 'auto', maxHeight: '600px' }}>
                {events.map((event) => (
                    <div className="card" key={event.id} onClick={() => handleEventClick(event)} style={{ cursor: 'pointer' }}>
                        <img src={event.image} className="card-img-top" alt={event.title} style={{ objectFit: 'cover', height: '200px' }} />
                        <div className="card-body">
                            <h5 className="card-title">{event.title}</h5>
                            <p className="card-text">{event.description}</p>
                            <p className="card-text"><small className="text-muted">Date: {event.date}</small></p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="container-lg mt-4">
                <h3 className="text-center">API Response</h3>
                <pre style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '5px' }}>{apiResponse}</pre>
            </div>
        </div>
    );
};

export default SearchEvents;