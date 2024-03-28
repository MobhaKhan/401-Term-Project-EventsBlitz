// src/components/BookingForm.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api/axiosConfig';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BsCheckCircle } from 'react-icons/bs';

const BookingForm = () => {
    const location = useLocation();
    const event = location.state.event;
    const [currentEvent, setCurrentEvent] = useState({});
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [bookedSeats, setBookedSeats] = useState([]);
    const [seats, setSeats] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [creditCard, setCreditCard] = useState('');
    const [expiryDate, setExpiryDate] = useState(new Date());
    const [insuranceSelected, setInsuranceSelected] = useState(false);
    const [formValidated, setFormValidated] = useState(false);
    const [fullName, setFullName] = useState('');
    const [cvv, setCvv] = useState('');
    const [formErrors, setFormErrors] = useState({
        fullName: '',
        creditCard: '',
        expiryDate: '',
        cvv: '',
    });
  
const CustomDateInput = ({ value, onClick }) => (
  <Button
    className="example-custom-input"
    onClick={onClick}
    style={{
      border: '1px solid #ced4da',
      padding: '.375rem .75rem',
      borderRadius: '.25rem',
      color: '#495057',
      backgroundColor: 'white',
      cursor: 'pointer'
    }}
  >
    {value}
  </Button>
);

    useEffect(() => {
        const fetchSeatsAndBookings = async () => {
            try {
                const [bookingsResponse, seatsResponse, eventDetailResponse] = await Promise.all([
                    api.get(`/bookings/getAllBookings`),
                    api.get(`/seats/byEventID/${event.eventID}`),
                    api.get(`/events/${event.eventID}`) 
                ]);

                const bookings = bookingsResponse.data;
                const eventBookings = bookings.filter((booking) => booking.eventID === event.eventID);
                const bookedSeats = eventBookings.map((booking) => booking.seatNumber);
                setBookedSeats(bookedSeats);

                setSeats(seatsResponse.data);

                setCurrentEvent(eventDetailResponse.data);
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
        if (!fullName || !creditCard || !cvv || creditCard.length<16) {
            setFormValidated(true); // Triggers form validation
            // Update formErrors state based on the missing fields
            setFormErrors({
                fullName: !fullName ? 'Full name is required' : '',
                creditCard: !creditCard ? 'Credit card number is required' : '',
                cvv: !cvv ? 'CVV is required' : '',
                // Additional fields can be validated here
            });
            return; // Prevent form submission if validation fails
        }
        e.preventDefault();
        setIsLoading(true); // Start loading
        setShowPaymentModal(false); // Close payment modal
        setShowConfirmationModal(true); // Open confirmation modal

        try {
            //create a booking for each selected seat
            for (const seatNumber of selectedSeats) {
                const response = await api.post('/bookings/createBooking', {
                    userID: parseInt(sessionStorage.getItem('userID')),
                    eventID: event.eventID,
                    seatNumber: seatNumber,
                    insuranceSelected: insuranceSelected,
                    paymentAmount: seats.find(seat => seat.seatNumber === seatNumber).price + currentEvent.ticketPrice,
                    isCancelled: false
                });
                console.log(response);

                //send email confirmation
                const emailResponse = await api.post('/mail', {
                    to: sessionStorage.getItem('email'),
                    subject: 'Event Booking Confirmation',
                    body: `Congratulations! Your booking for the ${event.eventName} event on ${new Date(event.eventDate).toLocaleDateString()} has been successfully 
                    confirmed. We can't wait to welcome you to this thrilling event! Your payment of $${event.ticketPrice} has been processed.

                    For additional details about the event, feel free to log into your EventsBlitz account and navigate to "My Account".
                    Thank you for choosing EventsBlitz, and we look forward to providing you with an unforgettable experience!`                   
                });
                console.log(emailResponse);

            }
            setIsLoading(false);
        } catch (error) {
            console.log("Booking Error: ",error);
            setIsLoading(false); // End loading
        }
    }

    // Function to redirect to the My Account page
    const redirectToMyAccount = () => {
        window.location.href = '/myAccount';
    };

    const renderSeats = () => {
        // Define the maximum number of seats per row
        const maxSeatsPerRow = 6; // Assuming we want 10 seats per row
      
        // Sort the seats by their seat numbers
        const sortedSeats = [...seats].sort((a, b) => a.seatNumber.localeCompare(b.seatNumber));
      
        // Slice the array into subarrays of length maxSeatsPerRow
        const seatChunks = [];
        for (let i = 0; i < sortedSeats.length; i += maxSeatsPerRow) {
          seatChunks.push(sortedSeats.slice(i, i + maxSeatsPerRow));
        }
      
        // Define a consistent button size and margin
        const buttonStyle = {
          width: '50px', // Adjust width as necessary for your design
          height: '50px', // Adjust height as necessary for your design
          margin: '10px', // This will create space around each button
        };
      
        // Map each chunk to a Row component
        return (
          <div className="seat-selection-grid">
            <h3 className="text-center text-purple">Seat Selection</h3>
            {seatChunks.map((chunk, index) => (
              <div key={index} className="d-flex flex-wrap justify-content-center align-items-center">
                {chunk.map(seat => (
                  <button
                    key={seat.seatNumber}
                    type="button"
                    className={`btn btn-sm ${selectedSeats.includes(seat.seatNumber) ? 'btn-primary' : bookedSeats.includes(seat.seatNumber) ? 'btn-danger' : 'btn-secondary'}`}
                    onClick={() => handleSeatClick(seat.seatNumber)}
                    disabled={bookedSeats.includes(seat.seatNumber)}
                    style={buttonStyle}
                  >
                    {seat.seatNumber}
                  </button>
                ))}
              </div>
            ))}
          </div>
        );
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
                    {renderSeats()}
                </Col>
                <hr style={{ width: '100%', borderColor: 'purple'}} />
                <Row className="justify-content-center mt-3">
                    <Col className="text-center">
                        <Button variant="primary" onClick={() => setShowPaymentModal(true)}>Proceed to Payment</Button>
                    </Col>
                </Row>
            </Row>
            {/* Payment Modal */}
            <Modal show={showPaymentModal} onHide={() => setShowPaymentModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Payment Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={formValidated}>
                    <Form.Group controlId="fullName" className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            required 
                            value={fullName}
                            onChange={e => setFullName(e.target.value)}
                            isInvalid={formValidated && !fullName}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a full name.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="creditCardNumber" className="mb-3">
                        <Form.Label>Credit Card Number</Form.Label>
                        <Form.Control 
                            type="text" 
                            required 
                            value={creditCard} 
                            onChange={e => setCreditCard(e.target.value)} 
                            isInvalid={formValidated && !creditCard}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a credit card number.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Row>
                    <Form.Group controlId="expiryDate" className="mb-3">
                        <Form.Label>Expiry Date</Form.Label>
                        <Col sm="8">
                            <DatePicker
                            selected={expiryDate}
                            onChange={date => setExpiryDate(date)}
                            dateFormat="MM/yyyy"
                            showMonthYearPicker
                            customInput={<CustomDateInput />}
                            placeholderText="MM/YYYY"
                            required
                            />
                        </Col>
                        </Form.Group>
                        <Col>
                        <Form.Group controlId="cvv" className="mb-3">
                            <Form.Label>CVV</Form.Label>
                            <Form.Control 
                                type="text" 
                                required 
                                value={cvv} 
                                onChange={e => setCvv(e.target.value)}
                                isInvalid={formValidated && !cvv}
                                style={{ width: '80px' }}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a CVV.
                            </Form.Control.Feedback>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group controlId="cancellationInsurance" className="mb-3">
                        <Form.Check 
                            type="checkbox" 
                            label="Would you like cancellation insurance?" 
                            checked={insuranceSelected} 
                            onChange={(e) => setInsuranceSelected(e.target.checked)} // Update state based on checkbox
                        />
                    </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleBooking} disabled={isLoading}>
                        Confirm Booking
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* Booking Confirmation Modal */}
            <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)}>
                <Modal.Body className="text-center">
                    <h4>Thank you for your purchase!</h4>
                    <div className="my-3">
                        <BsCheckCircle color="green" size={32} className="me-2" />
                        <span>Your payment has been confirmed.</span>
                    </div>
                    <p>Your ticket is ready to view in your account page and email confirmation has also been sent.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={redirectToMyAccount}>Go to My Account</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default BookingForm;