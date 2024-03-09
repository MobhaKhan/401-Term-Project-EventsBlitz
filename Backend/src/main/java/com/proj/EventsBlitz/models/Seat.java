package com.proj.EventsBlitz.models;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "Seat")
public class Seat {

    @Id
    @Column(name = "SeatNumber", nullable = false)
    private String seatNumber;

    @ManyToOne
    @JoinColumn(name = "EventID", nullable = false)
    private Event event;

    @Column(name = "SeatType", nullable = false, length = 20)
    private String seatType;

    @Column(name = "Price", nullable = false)
    private BigDecimal price;

    public Seat() {
    }

    public Seat(String seatNumber, Event event, String seatType, BigDecimal price) {
        this.seatNumber = seatNumber;
        this.event = event;
        this.seatType = seatType;
        this.price = price;
    }

    public String getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(String seatNumber) {
        this.seatNumber = seatNumber;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public String getSeatType() {
        return seatType;
    }

    public void setSeatType(String seatType) {
        this.seatType = seatType;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "Seat{" +
                "seatNumber='" + seatNumber + '\'' +
                ", event=" + event +
                ", seatType='" + seatType + '\'' +
                ", price=" + price +
                '}';
    }
}
