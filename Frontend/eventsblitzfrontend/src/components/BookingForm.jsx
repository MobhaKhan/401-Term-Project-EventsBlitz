// src/components/BookingForm.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api/axiosConfig';
import { Container, Row, Col, Button, Alert, Modal, Form } from 'react-bootstrap';

const BookingForm = () => {
    const location = useLocation();
    const event = location.state.event;
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [bookedSeats, setBookedSeats] = useState([]);
    const [seats, setSeats] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [creditCard, setCreditCard] = useState('');

    const handleOpenModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    useEffect(() => {
        const fetchSeatsAndBookings = async () => {
            try {
                const [bookingsResponse, seatsResponse] = await Promise.all([
                    api.get(`/bookings/getAllBookings`),
                    api.get(`/seats/byEventID/${event.eventID}`)
                ]);

                const bookings = bookingsResponse.data;
                const eventBookings = bookings.filter((booking) => booking.eventID === event.eventID);
                const bookedSeats = eventBookings.map((booking) => booking.seatNumber);
                setBookedSeats(bookedSeats);

                setSeats(seatsResponse.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchSeatsAndBookings();
    }, [event.eventID]);

    const handleSeatClick = (seatNumber) => {
        if (bookedSeats.includes(seatNumber)) {
            // If the seat is already booked, don't do anything.
            return;
        }
        if (selectedSeats.includes(seatNumber)) {
            setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
        } else {
            setSelectedSeats([...selectedSeats, seatNumber]);
        }
    }

    const handleBooking = async (e) => {
        if (!creditCard) {
            alert('Please enter your credit card information.');
            return;
        }
        //call the handleBooking function
        handleCloseModal();

        e.preventDefault();
        setIsLoading(true); // Start loading
        try {
            //create a booking for each selected seat
            for (const seatNumber of selectedSeats) {
                const response = await api.post('/bookings/createBooking', {
                    userID: parseInt(sessionStorage.getItem('userID')),
                    eventID: event.eventID,
                    seatNumber: seatNumber,
                    insuranceSelected: false,
                    paymentAmount: seats.find(seat => seat.seatNumber === seatNumber).price,
                    isCancelled: false
                });
                console.log(response);

                //send email confirmation
                const emailResponse = await api.post('/mail', {
                    to: sessionStorage.getItem('email'),
                    subject: 'Event Booking Confirmation',
                    body: `Your booking for the ${event.eventName} event has been confirmed.`
                });
                console.log(emailResponse);

            }
            //redirect to the my account page
            setIsLoading(false);
            window.location.href = '/myAccount';
        } catch (error) {
            console.log(error);
            setIsLoading(false); // End loading
        }
    }

    const renderSeats = () => {
        // Sort the seats by their seat numbers
        const sortedSeats = [...seats].sort((a, b) => a.seatNumber.localeCompare(b.seatNumber));

        // Group the seats by the number part of the seat number
        const seatRows = sortedSeats.reduce((rows, seat) => {
            const numberPart = seat.seatNumber.match(/\d+/)[0];
            if (!rows[numberPart]) {
                rows[numberPart] = [];
            }
            rows[numberPart].push(seat);
            return rows;
        }, {});

        // For each group, create a row and within each row, create a column for each seat
        return Object.values(seatRows).map((rowSeats, rowIndex) => (
            <Row key={rowIndex} className="mb-2">
                {rowSeats.map(seat => (
                    <Col key={seat.seatNumber} xs={1}> 
                        <button
                            type="button"
                            className={`btn btn-sm ${selectedSeats.includes(seat.seatNumber) ? 'btn-primary' : bookedSeats.includes(seat.seatNumber) ? 'btn-danger' : 'btn-secondary'}`}
                            onClick={() => handleSeatClick(seat.seatNumber)}
                            disabled={bookedSeats.includes(seat.seatNumber)} // This disables the button if the seat is booked
                            style={{ margin: '0 4px' }}
                        >
                            {seat.seatNumber}
                        </button>
                    </Col>
                ))}
            </Row>
        ));
    }

    return (
        <Container>
            <Row className="justify-content-center bg-primary-subtle p-5 rounded-5 mt-5">
                <Row className="justify-content-center mt-3 mb-4">
                    <Col className="text-center">
                        <h1>Finalize Booking</h1>
                    </Col>
                </Row>
                <hr style={{ width: '100%', borderColor: 'purple', marginBottom: '2rem' }} /> 
                <Col md={5}>
                    <h3 className="text-purple">Event Details</h3>
                    <p style={{ lineHeight: '2.5' }}>
                        <span style={{ color: 'purple', fontWeight: 'bold' }}>Event Name: </span>{event.eventName}<br />
                        <span style={{ color: 'purple', fontWeight: 'bold' }}>Date: </span>{new Date(event.eventDate).toLocaleDateString()}<br />
                        <span style={{ color: 'purple', fontWeight: 'bold' }}>Time: </span>{event.eventTime}<br />
                        <span style={{ color: 'purple', fontWeight: 'bold' }}>Location: </span>{event.eventLocation}<br />
                        <span style={{ color: 'purple', fontWeight: 'bold' }}>Ticket Price: </span>${event.ticketPrice}.00<br />
                        <span style={{ color: 'purple', fontWeight: 'bold' }}>Only {event.availableTickets} tickets left!</span>
                    </p>
                </Col>
                <Col md={6}>
                    <h3 className="text-purple">Seat Selection</h3>
                    {renderSeats()}
                </Col>
                <hr style={{ width: '100%', borderColor: 'purple'}} />
                <Row className="justify-content-center mt-3">
                    <Col className="text-center">
                        <Button variant="primary" onClick={handleOpenModal}>Confirm Booking</Button>
                    </Col>
                </Row>
            </Row>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter Credit Card Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Credit Card Number</Form.Label>
                            <Form.Control type="text" value={creditCard} onChange={e => setCreditCard(e.target.value)} required />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleBooking}>Confirm Booking</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default BookingForm;