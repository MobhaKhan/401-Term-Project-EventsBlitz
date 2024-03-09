package com.proj.EventsBlitz.models;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "Booking")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BookingID")
    private int bookingID;

    @Column(name = "UserID", nullable = false)
    private int userID;

    @Column(name = "EventID", nullable = false)
    private int eventID;

    @Column(name = "SeatNumber", nullable = false)
    private String seatNumber;

    @Column(name = "InsuranceSelected", nullable = false)
    private boolean insuranceSelected;

    @Column(name = "PaymentAmount", nullable = false, precision = 10, scale = 2)
    private BigDecimal paymentAmount;

    @Column(name = "IsCancelled", nullable = false)
    private boolean isCancelled;

    public int getBookingID() {
        return bookingID;
    }

    public int getUserID() {
        return userID;
    }

    public int getEventID() {
        return eventID;
    }

    public String getSeatNumber() {
        return seatNumber;
    }

    public boolean isInsuranceSelected() {
        return insuranceSelected;
    }

    public BigDecimal getPaymentAmount() {
        return paymentAmount;
    }

    public boolean isCancelled() {
        return isCancelled;
    }

    // Setters
    public void setBookingID(int bookingID) {
        this.bookingID = bookingID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public void setEventID(int eventID) {
        this.eventID = eventID;
    }

    public void setSeatNumber(String seatNumber) {
        this.seatNumber = seatNumber;
    }

    public void setInsuranceSelected(boolean insuranceSelected) {
        this.insuranceSelected = insuranceSelected;
    }

    public void setPaymentAmount(BigDecimal paymentAmount) {
        this.paymentAmount = paymentAmount;
    }

    public void setCancelled(boolean isCancelled) {
        this.isCancelled = isCancelled;
    }

    // toString Method
    @Override
    public String toString() {
        return "Booking{" +
                "bookingID=" + bookingID +
                ", userID=" + userID +
                ", eventID=" + eventID +
                ", seatNumber='" + seatNumber + '\'' +
                ", insuranceSelected=" + insuranceSelected +
                ", paymentAmount=" + paymentAmount +
                ", isCancelled=" + isCancelled +
                '}';
    }
}
