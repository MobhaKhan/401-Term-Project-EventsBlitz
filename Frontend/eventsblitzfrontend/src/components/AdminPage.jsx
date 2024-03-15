import React from 'react';


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

    return (
        <div className="bg-white rounded-5 p-3">
            <h1>Admin Page</h1>
            <div class="text-center p-5">
            <h1 style={titleStyle}>This is the Admin page</h1>
            <p style={subtitleStyle}>This is the Admin page!</p>
        </div>
        </div>
    );
};

export default AdminPage;