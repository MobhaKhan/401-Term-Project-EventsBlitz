import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "../src/components/Login";
import api from "../src/api/axiosConfig";

jest.mock("../src/api/axiosConfig", () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

// Setup mock sessionStorage
const mockSessionStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'sessionStorage', {
  value: mockSessionStorage,
});

// Mock for window.location.href
const originalLocation = window.location;
delete window.location;
window.location = { ...originalLocation, href: jest.fn() };

describe('Login Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    api.get.mockReset();
    api.post.mockReset();
    window.sessionStorage.clear();
    window.location.href.mockReset();
  });

  // Restoring everything back to the original state after all tests
  afterAll(() => {
    window.location = originalLocation;
  });

  test("renders login form and registration button", () => {
    render(<Login />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByText("Sign in")).toBeInTheDocument();
    expect(screen.getByText("Sign up for free!")).toBeInTheDocument();
  });

  test("displays error message on invalid login", async () => {
    render(<Login />);
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const signInButton = screen.getByText("Sign in");

    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.click(signInButton);

    const errorMessage = await screen.findByText("Invalid login. Please try again.");
    expect(errorMessage).toBeInTheDocument();
  });

  test("submits registration form with valid data", async () => {
    api.post.mockResolvedValueOnce({ status: 200, data: { userID: "123" } });
    render(<Login />);
    const registerButton = screen.getByText("Register");
    fireEvent.click(registerButton);

    const emailInput = screen.getByLabelText("Email");
    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    const addressInput = screen.getByLabelText("Address");
    const creditCardInput = screen.getByLabelText("Credit Card");
    const confirmButton = screen.getByText("Confirm");

    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(addressInput, { target: { value: "123 Main St" } });
    fireEvent.change(creditCardInput, { target: { value: "1234567890123456" } });

    fireEvent.click(confirmButton);

    await waitFor(() =>
      expect(api.post).toHaveBeenCalledWith("/users/createRegisteredUser", {
        username: "testuser",
        email: "user@example.com",
        address: "123 Main St",
        type: "Registered",
        password: "password",
        creditCard: "1234567890123456",
      })
    );
  });

  test('successful login for a registered user', async () => {
    api.get.mockImplementation(url => {
      if (url.endsWith('/users/getAllUsers')) {
        return Promise.resolve({ data: '[["123", "Test User", "Test Address", "user@example.com", "Registered"]]' });
      } else if (url.endsWith('/registeredUsers/getAllRegisteredUsers')) {
        return Promise.resolve({ data: '[["1", "123", "password", "1234567890123456"]]' });
      }
      return Promise.reject(new Error('not found'));
    });
  
    render(<Login />);
  
    fireEvent.change(screen.getByPlaceholderText("Enter email"), { target: { value: "user@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Enter password"), { target: { value: "password" } });
    fireEvent.click(screen.getByText("Sign in"));
  
    await waitFor(() => expect(mockSessionStorage.setItem).toHaveBeenCalledWith('isAuthenticated', true));

    expect(mockSessionStorage.setItem).toHaveBeenCalledWith('email', 'user@example.com');
    expect(mockSessionStorage.setItem).toHaveBeenCalledWith('type', 'Registered');
    expect(mockSessionStorage.setItem).toHaveBeenCalledWith('userID', '123');
  });
  
});