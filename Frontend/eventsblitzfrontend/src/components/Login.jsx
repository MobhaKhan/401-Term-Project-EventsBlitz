import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
// import api from '../api/axiosConfig';
// import AirlineAgentLogin from './AirlineAgentLogin'; // Import the AirlineAgentLogin component
// import AdminLogin from './AdminLogin';
import axios from 'axios'; // Import axios library for making HTTP requests

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
    const [loginResponse, setLoginResponse] = useState(null); // Variable to store login response data
    const handleAdminLogin = async (email, password) => {
        try {
            console.log('Inputted Email:', email);
            console.log('Inputted Password:', password);
    
            // Make API calls to get all admins and all users
            const adminsResponse = await axios.get('http://127.0.0.1:8080/api/admins/getAllAdmins');
            const usersResponse = await axios.get('http://127.0.0.1:8080/api/users/getAllUsers');
    
        // Parse response from admins API call
const adminsData = adminsResponse.data.split(', ').map(admin => {
    const fields = admin.split(' -> ').map(field => field.trim());
    return { AdminID: fields[0].replace('Admin ID: ', ''), UserID: fields[1].replace('User ID: ', ''), Pwd_Admin: fields[2].replace('Admin Password: ', '').slice(0, -1) };
});

    
            // Parse response from users API call
            const usersData = usersResponse.data.split(', ').map(user => {
                const fields = user.split(' -> ').map(field => field.trim());
                return { UserID: fields[0], UserName: fields[1], UserAddress: fields[2], Email: fields[3], UserType: fields[4] };
            });
    
            // Create a map to store admin data by user ID
            const adminsMap = {};
            adminsData.forEach(admin => {
                if (!adminsMap[admin.UserID]) {
                    adminsMap[admin.UserID] = admin;
                }
            });
    
            // Merge admin data with user data
            const combinedData = usersData.map(user => {
                const admin = adminsMap[user.UserID];
                if (admin) {
                    return {
                        UserID: user.UserID,
                        UserName: user.UserName,
                        UserAddress: user.UserAddress,
                        Email: user.Email,
                        UserType: user.UserType,
                        RegisteredUserID: admin.AdminID.replace('[', '').replace(']', ''), // Remove square brackets
                        Password: admin.Pwd_Admin
                    };
                } else {
                    return user;
                }
            });
    
            // Filter out admin users
            const adminusers = combinedData.filter(user => user.UserType === 'Admin');
    
            // Check if the entered email and password match any admin's credentials
            const matchedAdmin = adminusers.find(user => {
                console.log('Comparing with Email:', user.Email);
                console.log('Comparing with Password:', user.Password);
                return user.Email === email && user.Password === password;
            });
            
    
            if (matchedAdmin) {
                // Display success popup
                window.location.href = '/AdminPage';

                alert('YAY');
            } else {
                // Display failure popup
                alert('NAY');
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error, e.g., display error message
            alert('Failed to fetch data. Please try again.');
        }
    };
    

    const handleLogin = async () => {
        try {
            // Make the first API call to get all users
            const usersResponse = await axios.get('http://127.0.0.1:8080/api/users/getAllUsers');
            // Make the second API call to get all registered users
            const registeredUsersResponse = await axios.get('http://127.0.0.1:8080/api/registeredUsers/getAllRegisteredUsers');
            const adminsResponse = await axios.get('http://127.0.0.1:8080/api/admins/getAllAdmins');

            // Process response from the first API call
            let allUsersData = [];
            if (typeof usersResponse.data === 'string') {
                const usersEntries = usersResponse.data.split(', ');
                allUsersData = usersEntries.map(entry => {
                    const fields = entry.split(' -> ').map(field => field.replace(/[\[\]]/g, '').trim());
                    return { UserID: fields[0], UserName: fields[1], UserAddress: fields[2], Email: fields[3], UserType: fields[4] };
                });
            } else {
                console.error('Invalid response data format for all users:', usersResponse.data);
                // Handle the error accordingly
            }
    
            // Process response from the second API call
            const registeredUsersEntries = registeredUsersResponse.data.split(', ');
            const registeredUsersData = registeredUsersEntries.map(entry => {
                const fields = entry.split(' -> ').map(field => field.replace(/[\[\]]/g, '').trim());
                return { RegisteredUserID: fields[0], UserID: fields[1], Password: fields[2], CreditCardNumber: fields[3] };
            });
    
            // Add additional fields from registeredUsers to allUsers
            allUsersData.forEach(user => {
                const registeredUserData = registeredUsersData.find(registeredUser => registeredUser.UserID === user.UserID);
                if (registeredUserData) {
                    user.RegisteredUserID = registeredUserData.RegisteredUserID;
                    user.Password = registeredUserData.Password;
                    user.CreditCardNumber = registeredUserData.CreditCardNumber;
                }
            });
    
            // Filter allUsers to include only users with UserType "Registered"
            const registeredUsersOnly = allUsersData.filter(user => user.UserType === 'Registered');
    
            // Combine data from both responses
            const combinedData = {
                allUsers: registeredUsersOnly,
            };
    
            // Check if the entered email and password match any user's credentials
            const matchedUser = registeredUsersOnly.find(user => user.Email === email && user.Password === password);
            if (matchedUser) {
                // Display success popup
                // alert('YAYYY');
                console.log(JSON.stringify(combinedData));
                setIsAuthenticated(true)
                // Redirect to home page
                window.location.href = '/Home';
            } else {
                console.log(JSON.stringify(combinedData));

                // Display failure popup
                setIsAuthenticated(false); // Set isAuthenticated to false on failed login

                alert('NAY');
            }
        } catch (error) {
            
            console.error('Login Error:', error);
            setIsAuthenticated(false); // Set isAuthenticated to false on failed login

            // Handle error, e.g., display error message
            alert('Login failed. Please try again.');
        }
    };

    // Handle registration button click
    const handleRegistration = () => {
        setShowRegistrationModal(true);
    };

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
        <Form.Label>faria here Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
    </Form.Group>
    <Form.Group controlId="formPassword" className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
    </Form.Group>
    <Button variant="primary" onClick={() => handleLogin(email, password)}>Sign in as Registered User</Button>
    <Button variant="secondary" onClick={() => handleAdminLogin(email, password)} style={buttonStyle}>Sign in as Admin</Button>
</Form>

                    </div>
                    <div className="col-md-6 text-center" style={columnStyle}>
                        <h4>Sign up for free!</h4>
                        <Button variant="success" style={buttonStyle}>Register</Button>
                    </div>
                </div>

             
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