import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import { Modal } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // default style

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
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [calendarEvents, setCalendarEvents] = useState([]);

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
        const response = await api.get('/bookings/getAllBookings');
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
        const response = await api.get('/events/getAllEvents');
        setEvents(response.data);
        console.log('Events Data:', response.data);
      } catch (error) {
        console.error('Error fetching events data:', error);
      }
    };

    fetchEventsData();

    const fetchCalendarEvents = () => {
      const eventsForCalendar = bookings.map(booking => {
        const event = events.find(e => e.eventID === booking.eventID);
        return {
          date: event.eventDate,
          title: event.eventName,
        };
      });
      setCalendarEvents(eventsForCalendar);
    };

    if (bookings.length > 0 && events.length > 0) {
      fetchCalendarEvents();
    }
  }, [bookings, events]);

  const handleDeleteBooking = async (bookingID, eventName, eventDate, ticketPrice) => {
    // Confirm cancellation with the user
    const confirmCancel = window.confirm(`Are you sure you want to cancel your ticket for ${eventName} on ${eventDate}?`);
    if (!confirmCancel) {
      return; // Cancel deletion if user cancels the confirmation
    }
    // Close the modal
    handleCloseModal();
    
    try {
      await api.delete(`/bookings/${bookingID}`);
      // Update bookings state after deletion
      setBookings(prevBookings => prevBookings.filter(booking => booking.bookingID !== bookingID));
      //send email confirmation
      const emailResponse = await api.post('/mail', {
        to: sessionStorage.getItem('email'),
        subject: 'Event Booking Cancellation',
        body: `Your booking for the ${eventName} event on ${eventDate} has been canceled. You have been refunded $${ticketPrice}. 
        While we're sad to see you go, remember that there are always more exciting events waiting for you on our website. We look
        forward to welcoming you back soon!`
      });
      console.log(emailResponse);
      console.log('Booking canceled successfully.');
    } catch (error) {
      console.error('Error canceling booking:', error);
    }
  };

  const handleTicketClick = (bookingID) => {
    // Find the associated event using the booking's eventID
    const bookingWithEventDetails = bookings.find(booking => booking.bookingID === bookingID);
    const eventDetails = events.find(event => event.eventID === bookingWithEventDetails.eventID);
  
    if (eventDetails) {
      setSelectedBooking({
        ...bookingWithEventDetails,
        eventName: eventDetails.eventName,
        eventDate: eventDetails.eventDate,
        ticketPrice: eventDetails.ticketPrice,
      });
    } else {
      console.error('No event details found for booking:', bookingID);
    }
  };

  const handleCloseModal = () => {
    setSelectedBooking(null);
  };

  return (
    <div className="container bg-primary-subtle p-4 rounded-5 mt-5">
      <div className="row justify-content-center">
        <div className="col-12 text-center user-info mb-3">
          <div className="profile-logo" style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#ccc', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', fontSize: '48px', fontWeight: 'bold' }}>
            {user.username.charAt(0)}
          </div>
          <div style={{ marginTop: '10px' }}>
            <p style={{ fontSize: '30px' }}><strong>{user.username}</strong></p>
            <p style={{ marginTop: '-15px' }}>{user.email}</p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <h3 className="text-center">My Bookings</h3>
          <div className="tickets-list" style={{ overflowY: 'auto', maxHeight: '300px' }}>
            {bookings.map(booking => {
              const event = events.find(event => event.eventID === booking.eventID);
              return (
                <div key={booking.bookingID} onClick={() => handleTicketClick(booking.bookingID)} style={{ background: 'white', margin: '10px', borderRadius: '5px', padding: '10px', cursor: 'pointer' }}>
                  <h4 style={{ color: 'purple' }}>{event ? event.eventName : 'N/A'}</h4>
                  <strong><p>{event ? new Date(event.eventDate).toLocaleDateString() : 'N/A'}</p></strong>
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-md-5 d-flex justify-content-center">
        <Calendar
          style={{ width: '100%' }}
          tileContent={({ date, view }) => {
            const event = calendarEvents.find(e => new Date(e.date).toDateString() === date.toDateString());
            return view === 'month' && event ? (
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'purple', borderRadius: '4px' }}></div>
                <p style={{ position: 'relative', zIndex: '1', color: '#fff', padding: '5px', borderRadius: '4px', textAlign: 'center', fontSize: '7px', lineHeight: '1.4', margin: '0' }}>
                  {event.title}
                </p>
              </div>
            ) : null;
          }}
        />
      </div>
    </div>
      {selectedBooking && (
        <Modal show={true} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Ticket</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <h4>Event Name: {selectedBooking.eventName}</h4>
              <p><strong>Event Date:</strong> {new Date(selectedBooking.eventDate).toLocaleDateString()}</p>
              <p><strong>Seat Number:</strong> {selectedBooking.seatNumber}</p>
              <p><strong>Insurance Selected:</strong> {selectedBooking.insuranceSelected ? 'Yes' : 'No'}</p>
              <p><strong>Payment Amount:</strong> ${selectedBooking.paymentAmount.toFixed(2)}</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={() => handleDeleteBooking(selectedBooking.bookingID, selectedBooking.eventName, new Date(selectedBooking.eventDate).toLocaleDateString(), selectedBooking.paymentAmount)} style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px' }}>Cancel Booking</button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );  
};

export default MyAccount;
