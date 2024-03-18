import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../api/axiosConfig';

const MyAccount = () => {
  // State variables to store user details, bookings, and events data
  const [user, setUser] = useState({
    userID: '',
    username: '',
    email: '',
    // Add more user details as needed
  });
  const [bookings, setBookings] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Retrieve user details from session storage
    const userID = sessionStorage.getItem('userID');
    const username = sessionStorage.getItem('username');
    const email = sessionStorage.getItem('email');

    // Log the retrieved values to check
    console.log('User ID:', userID);
    console.log('Username:', username);
    console.log('Email:', email);

    // Update user state with retrieved details
    setUser({
      userID: userID || '',
      username: username || '',
      email: email || '',
      // Add more user details as needed
    });

    // Fetch bookings data for the current user ID
    const fetchBookingsData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8080/api/bookings/getAllBookings');
        // Filter bookings data to include only bookings for the current user ID
        const userBookings = response.data.filter(booking => booking.userID === parseInt(userID));
        setBookings(userBookings);
        console.log('User Bookings:', userBookings);
      } catch (error) {
        console.error('Error fetching bookings data:', error);
      }
    };

    fetchBookingsData();

    // Fetch events data
    const fetchEventsData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8080/api/events/getAllEvents');
        setEvents(response.data);
        console.log('Events Data:', response.data);
      } catch (error) {
        console.error('Error fetching events data:', error);
      }
    };

    fetchEventsData();
  }, []);

  const handleDeleteBooking = async (bookingID, eventName, eventDate) => {
    // Confirm cancellation with the user
    const confirmCancel = window.confirm(`Are you sure you want to cancel your ticket for ${eventName} on ${eventDate}?`);
    if (!confirmCancel) {
      return; // Cancel deletion if user cancels the confirmation
    }

    try {
      await axios.delete(`http://127.0.0.1:8080/api/bookings/${bookingID}`);
      // Update bookings state after deletion
      setBookings(prevBookings => prevBookings.filter(booking => booking.bookingID !== bookingID));
      //send email confirmation
      const emailResponse = await api.post('/mail', {
        to: sessionStorage.getItem('email'),
        subject: 'Event Booking Cancellation',
        body: `Your booking number ${bookingID} has been cancelled.`
      });
      console.log(emailResponse);
      console.log('Booking canceled successfully.');
    } catch (error) {
      console.error('Error canceling booking:', error);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '25%', borderRight: '1px solid #ccc', paddingRight: '10px' }}>
        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#ccc', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', fontSize: '24px', fontWeight: 'bold' }}>
            {user.username.charAt(0)}
          </div>
          <p><strong>{user.username}</strong></p>
        </div>
        <div>
          {/* <h3>User Information:</h3> */}
          {/* <p><strong>User ID:</strong> {user.userID}</p> */}
          <p><strong>Email:</strong> {user.email}</p>
          {/* Add more user details here */}
        </div>
        {/* Additional sections for profile management */}
      </div>
      <div style={{ width: '75%', paddingLeft: '10px' }}>
        <h3>User Bookings:</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {bookings.map(booking => {
            const event = events.find(event => event.eventID === booking.eventID);
            return (
              <div key={booking.bookingID} style={{ width: '30%', margin: '10px', borderRadius: '5px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
                <div style={{ backgroundColor: '#f8f9fa', padding: '10px' }}>
                  <h4 style={{ marginBottom: '5px' }}>Event Name: {event ? event.eventName : 'N/A'}</h4>
                  <p style={{ margin: '5px 0' }}><strong>Event Date:</strong> {event ? new Date(event.eventDate).toLocaleDateString() : 'N/A'}</p>
                  <p style={{ margin: '5px 0' }}><strong>Seat Number:</strong> {booking.seatNumber}</p>
                  <p style={{ margin: '5px 0' }}><strong>Insurance Selected:</strong> {booking.insuranceSelected ? 'Yes' : 'No'}</p>
                  <p style={{ margin: '5px 0' }}><strong>Payment Amount:</strong> ${booking.paymentAmount.toFixed(2)}</p>
                  {/* Add delete button */}
                  <button onClick={() => handleDeleteBooking(booking.bookingID, event ? event.eventName : 'N/A', event ? new Date(event.eventDate).toLocaleDateString() : 'N/A')} style={{ marginTop: '10px', backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', display: 'block', margin: '0 auto', borderRadius: '5px' }}>Cancel Booking</button>
                </div>
              </div>
            );
          })}
        </div>
        {/* Additional sections for booking management */}
      </div>
    </div>
  );
};

export default MyAccount;
