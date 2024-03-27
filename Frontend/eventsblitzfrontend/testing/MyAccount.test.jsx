import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import MyAccount from "../src/components/MyAccount";
import api from "../src/api/axiosConfig";

// Mocking API calls
jest.mock("../src/api/axiosConfig", () => ({
  get: jest.fn((url) => {
    if (url === "/bookings/getAllBookings") {
      return Promise.resolve({
        data: [
          { bookingID: 1, userID: 123, eventID: 456 },
          { bookingID: 2, userID: 123, eventID: 789 },
        ],
      });
    } else if (url === "/events/getAllEvents") {
      return Promise.resolve({
        data: [
          { eventID: 456, eventName: "Event 1", eventDate: "2024-04-01" },
          { eventID: 789, eventName: "Event 2", eventDate: "2024-04-15" },
        ],
      });
    }
  }),
  delete: jest.fn(() => Promise.resolve()),
}));

describe("MyAccount Component", () => {
  test("renders without crashing", async () => {
    render(<MyAccount />);
    await waitFor(() => {
      expect(screen.getByText("My Bookings")).toBeInTheDocument();
    });
  });

  test("displays user information and bookings correctly", () => {
    render(<MyAccount />);
    waitFor(() => {
      expect(screen.getByText("Username")).toBeInTheDocument();
      expect(screen.getByText("Email")).toBeInTheDocument();
      expect(screen.getByText("Event 1")).toBeInTheDocument();
      expect(screen.getByText("Event 2")).toBeInTheDocument();
    });
  });
  
  test("handles booking cancellation correctly", () => {
    render(<MyAccount />);
    waitFor(() => {
      const cancelButton = screen.getByText("Cancel Booking");
      fireEvent.click(cancelButton);
    });
    waitFor(() => {
      expect(screen.getByText(/Are you sure you want to cancel/i)).toBeInTheDocument();
      const confirmButton = screen.getByRole("button", { name: "OK" });
      fireEvent.click(confirmButton);
    });
    // Wait for the cancellation to be processed
    waitFor(() => {
      expect(api.delete).toHaveBeenCalled();
    });
  });
  
  test("displays modal with correct booking details when a booking is clicked", () => {
    render(<MyAccount />);
    waitFor(() => {
      const booking = screen.getByText("Event 1");
      fireEvent.click(booking);
    });
    waitFor(() => {
      expect(screen.getByText("Event Name: Event 1")).toBeInTheDocument();
      expect(screen.getByText("Event Date: 4/1/2024")).toBeInTheDocument();
    });
  });
  
  test("closes modal when cancel button is clicked", async () => {
    render(<MyAccount />);

    await waitFor(() => {
      expect(screen.queryByText("Event Name: Event 1")).not.toBeInTheDocument();
    });
  });

});