import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import AdminPage from "../src/components/AdminPage";
import api from "../src/api/axiosConfig";

jest.mock("../src/api/axiosConfig", () => ({
  post: jest.fn().mockResolvedValue({ data: {} }),
}));

describe("AdminPage Component", () => {
  beforeEach(() => {
    api.post.mockClear();
  });

  test("renders without crashing", () => {
    render(
      <Router>
        <AdminPage />
      </Router>
    );
    expect(screen.getByText("Admin Page")).toBeInTheDocument();
  });

  test("does not redirect if authenticated", () => {
    render(
      <Router>
        <AdminPage />
      </Router>
    );
    // Simulate authentication
    localStorage.setItem("adminToken", "some-token");
    expect(screen.getByText("Admin Page")).toBeInTheDocument();
  });
});