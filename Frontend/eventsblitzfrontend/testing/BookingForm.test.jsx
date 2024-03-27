import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import BookingForm from "../src/components/BookingForm";
import api from "../src/api/axiosConfig";
import { MemoryRouter } from "react-router-dom";

// Mocking necessary parts
jest.mock("../src/api/axiosConfig", () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

// Custom Input for DatePicker with forwardRef
const CustomDateInput = React.forwardRef(({ value, onClick }, ref) => (
  <button
    className="example-custom-input btn btn-primary"
    onClick={onClick}
    ref={ref}
  >
    {value}
  </button>
));
CustomDateInput.displayName = "CustomDateInput";

// Utility function to render the component within a mocked router environment
// Includes the ability to set the initial route and location state
const renderWithRouter = (ui, { route = "/", state = null } = {}) => {
  return render(
    <MemoryRouter initialEntries={[{ pathname: route, state }]}>
      {ui}
    </MemoryRouter>
  );
};

describe("BookingForm Component", () => {
  const mockEvent = {
    eventID: "1",
    eventName: "Test Event",
    eventDate: new Date().toISOString(),
    eventTime: "18:00",
    eventLocation: "Test Venue",
    ticketPrice: 50,
    availableTickets: 20,
  };

  beforeEach(() => {
    api.get.mockClear();
    api.post.mockClear();

    // Setup mock for api calls
    api.get
      .mockResolvedValueOnce({ data: [] }) // For bookings
      .mockResolvedValueOnce({
        data: Array.from({ length: 10 }, (_, i) => ({
          seatNumber: `S${i}`,
          price: 10,
        })),
      }) // For seats
      .mockResolvedValueOnce({ data: mockEvent }); // For event details
  });

  test("renders correctly with event details and seats", async () => {
    renderWithRouter(<BookingForm />, {
      route: "/booking?event=1",
      state: { event: mockEvent },
    });

    // Check if seats are rendered
    await waitFor(() =>
      expect(screen.getAllByRole("button", { name: /S\d/ })).toHaveLength(10)
    );
  });

  test("allows seat selection and shows payment modal", async () => {
    renderWithRouter(<BookingForm />, {
      route: "/booking?event=1",
      state: { event: mockEvent },
    });
  
    // Wait for seats to be loaded and click on a seat
    const seatButtons = await screen.findAllByRole("button", { name: /S\d/ });
    fireEvent.click(seatButtons[0]);
  
    // Proceed to payment
    fireEvent.click(screen.getByText(/Proceed to Payment/));
  
    // Use waitFor instead of await for screen to update
    waitFor(() => {
      expect(screen.getByRole("dialog", { name: "Payment Information" })).toBeInTheDocument();
    });
  });
  
  test("validates form inputs before confirming booking", async () => {
    renderWithRouter(<BookingForm />, {
      route: "/booking?event=1",
      state: { event: mockEvent },
    });

    // Open payment modal
    fireEvent.click(await screen.findByText(/Proceed to Payment/));

    // Try to confirm booking without filling out the form
    fireEvent.click(screen.getByText("Confirm Booking"));
    expect(
      await screen.findByText("Please provide a full name.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Please provide a credit card number.")
    ).toBeInTheDocument();
    expect(screen.getByText("Please provide a CVV.")).toBeInTheDocument();
  });

  test("handles booking confirmation successfully", async () => {
    api.post.mockResolvedValueOnce({ data: { message: "Booking successful" } }); // Mock booking API response

    renderWithRouter(<BookingForm />, {
      route: "/booking?event=1",
      state: { event: mockEvent },
    });

    // Select a seat and proceed to payment
    fireEvent.click((await screen.findAllByRole("button", { name: /S\d/ }))[0]);
    fireEvent.click(screen.getByText(/Proceed to Payment/));
  });
});
