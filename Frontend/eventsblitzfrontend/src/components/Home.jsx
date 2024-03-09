import React from 'react';

const Home = () => {
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

    return (
        <div class="text-center p-5">
            <h1 style={titleStyle}>Welcome to EventsBlitz</h1>
            <p style={subtitleStyle}>We provide the tickets. You experience the unforgettable!</p>
        </div>
    );
};

export default Home;
