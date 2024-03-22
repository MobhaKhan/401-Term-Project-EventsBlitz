// AdminPage.js
import React from 'react';
import SearchEvents from './SearchEvents';

const AdminPage = () => {
    const titleStyle = {
        fontSize: '6.5rem',
        color: 'white',
        textShadow: '0 0 20px #7D5A7D',
    };

    const subtitleStyle = {
        fontSize: '2rem',
        color: 'white',
        marginTop: '20px',
    };

    const handleCreateEvent = () => {
        // Logic to handle creation of event
        console.log("Creating event...");
    };

    const handleDeleteEvent = (event) => {
        // Logic to handle deletion of event
        console.log("Deleting event:", event);
    };

    const handleAddSeats = () => {
        // Logic to handle deletion of event
        console.log("adding seats...");
    };

    return (
        <div className="bg-white rounded-5 p-3">
            <h1>Admin Page</h1>
            <SearchEvents isAdmin={true} onCreateEvent={handleCreateEvent} onDeleteEvent={handleDeleteEvent} onAddSeat={handleAddSeats}/>
        </div>
    );
};

export default AdminPage;