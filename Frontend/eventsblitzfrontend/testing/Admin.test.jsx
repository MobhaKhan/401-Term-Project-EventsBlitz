import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import AdminLogin from "../src/components/AdminLogin";
import api from "../src/api/axiosConfig";

jest.mock("../src/api/axiosConfig", () => ({
  post: jest.fn(() => Promise.resolve({ data: { userID: "some-user-id" } })), // Mocking a resolved promise for successful API call
}));

describe("AdminLogin Component", () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    api.post.mockClear();
  });

  test("renders without crashing", () => {
    render(<AdminLogin />);
    expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter password")).toBeInTheDocument();
  });

  test("input values change as expected", () => {
    render(<AdminLogin />);
    const emailInput = screen.getByPlaceholderText("Enter email");
    const passwordInput = screen.getByPlaceholderText("Enter password");

    fireEvent.change(emailInput, { target: { value: "admin@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    expect(emailInput.value).toBe("admin@example.com");
    expect(passwordInput.value).toBe("password");
  });

  test("displays error message on invalid email format", async () => {
    render(<AdminLogin />);
    const emailInput = screen.getByPlaceholderText("Enter email");
    const loginButton = screen.getByRole("button", { name: "Login" });

    // Try to login with invalid email format
    fireEvent.change(emailInput, { target: { value: "invalidemail" } });
    fireEvent.click(loginButton);

    const errorMessage = await screen.findByText(
      "Please enter a valid email address."
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("handles login success correctly", async () => {
    api.post.mockResolvedValue({ data: { userID: "12345" } });

    render(<AdminLogin />);
    const emailInput = screen.getByPlaceholderText("Enter email");
    const passwordInput = screen.getByPlaceholderText("Enter password");
    const loginButton = screen.getByRole("button", { name: "Login" });

    fireEvent.change(emailInput, { target: { value: "admin@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.click(loginButton);

    // Wait for the API call to resolve and the component to rerender
    // Assume that upon successful login, the page redirects (which we can't test here)
    await waitFor(() =>
      expect(api.post).toHaveBeenCalledWith("/users/loginAdmin", {
        email: "admin@example.com",
        password: "password",
      })
    );
  });
});
