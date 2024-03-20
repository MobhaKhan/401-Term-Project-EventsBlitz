// AdminLogin.jsx
import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import api from '../api/axiosConfig';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const validateEmail = (email) => {
        // Simple regex for basic email validation
        return /\S+@\S+\.\S+/.test(email);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        try {
            const response = await api.post('/users/loginAdmin', { email, password });
            if (response.data.userID) {
                sessionStorage.setItem('userID', response.data.userID);
                sessionStorage.setItem('isAuthenticated', true);
                sessionStorage.setItem('email', email);
                sessionStorage.setItem('type', 'Admin');
                window.location.href = '/';
            } else {
                // Handle case where login is unsuccessful but no exception is thrown
                setError("Invalid login. Please try again.");
            }
        } catch (error) {
            setError("Invalid login. Please try again.");
            console.error(error);
        }
    }

    return (
        <Form className="container-fluid" onSubmit={handleLogin}>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmailChange} />
                        </Form.Group>
                        <Form.Group controlId="formPassword" className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" value={password} onChange={handlePasswordChange} />
                        </Form.Group>
            <Form.Group className="row justify-content-md-center p-4">
                <Button className="col col-sm-2" variant="secondary" type="submit">Login</Button>
            </Form.Group>
        </Form>
    );
};

export default AdminLogin;