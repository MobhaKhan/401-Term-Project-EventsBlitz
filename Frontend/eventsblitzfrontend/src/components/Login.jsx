import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
// import api from '../api/axiosConfig';
// import AirlineAgentLogin from './AirlineAgentLogin'; // Import the AirlineAgentLogin component
// import AdminLogin from './AdminLogin';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState(''); // New state variable for username
    const [address, setAddress] = useState('');
    const [creditCard, setCreditCard] = useState(''); // New state variable for credit card
    const [newsletter, setNewsletter] = useState(false); // New state variable for newsletter

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isGuest, setIsGuest] = useState(false); // New state variable for guest login

    const [showGuestModal, setShowGuestModal] = useState(false); // New state variable for showing the modal
    const [showRegistrationModal, setShowRegistrationModal] = useState(false); // New state variable for showing the registration modal

    const [showAdminLogin, setShowAdminLogin] = useState(false);

    const pageStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const containerStyle = {
        maxWidth: '800px',
        width: '90%', // Responsive width up to the maxWidth
        margin: 'auto',
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        padding: '20px',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.8)',
    };

    const columnStyle = {
        padding: '0 15px',
    };

    const borderRightStyle = {
        borderRight: '1px solid #ddd',
    };

    const headerStyle = {
        marginBottom: '30px',
    };

    const buttonStyle = {
        width: '100%',
        marginTop: '10px',
    };

    return (
        <div style={pageStyle}>
            <div style={containerStyle}>
                <h2 className="text-center" style={headerStyle}>Login</h2>
                <div className="row">
                    <div className="col-md-6" style={{...columnStyle, ...borderRightStyle}}>
                        <Form>
                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="formPassword" className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
                            </Form.Group>
                            {/* <Button variant="primary" style={buttonStyle}>Sign in</Button> */}
                            <Button variant="secondary" style={buttonStyle} onClick={() => {}}>Sign in as Guest</Button>
                            <Button variant="secondary" style={buttonStyle} onClick={() => {}}>Sign in as Admin</Button>
                        </Form>
                    </div>
                    <div className="col-md-6 text-center" style={columnStyle}>
                        <h4>Sign up for free!</h4>
                        <Button variant="success" style={buttonStyle}>Register</Button>
                    </div>
                </div>

                <Modal show={showGuestModal} onHide={() => setShowGuestModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Guest Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={email} onChange={() => {}} />
                            </Form.Group>
                            <Form.Group controlId="formAddress">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" placeholder="Enter address" value={address} onChange={() => {}} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowGuestModal(false)}>Close</Button>
                        <Button variant="primary" onClick={() => {}}>Confirm</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showRegistrationModal} onHide={() => setShowRegistrationModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Register</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={email} onChange={() => {}} />
                            </Form.Group>
                            <Form.Group controlId="formUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter username" value={username} onChange={() => {}} />
                            </Form.Group>
                            <Form.Group controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter password" value={password} onChange={() => {}} />
                            </Form.Group>
                            <Form.Group controlId="formAddress">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" placeholder="Enter address" value={address} onChange={() => {}} />
                            </Form.Group>
                            <Form.Group controlId="formCreditCard">
                                <Form.Label>Credit Card</Form.Label>
                                <Form.Control type="text" placeholder="Enter credit card" value={creditCard} onChange={() => {}} />
                            </Form.Group>
                            <Form.Group controlId="formNewsletter">
                                <Form.Check type="checkbox" label="Subscribe to our newsletter" value={newsletter} onChange={() => {}} />
                            </Form.Group>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowRegistrationModal(false)}>Close</Button>
                        <Button variant="primary" onClick={() => {}}>Confirm</Button>
                    </Modal.Footer>
                </Modal>


            </div>

            <Modal show={showAdminLogin} onHide={() => setShowAdminLogin(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Admin Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <AdminLogin /> Render the AdminLogin component */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAdminLogin(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>


    );
};

export default Login;