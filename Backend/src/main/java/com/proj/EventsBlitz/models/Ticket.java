package com.proj.EventsBlitz.models;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "tickets")
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ticket_id")
    private int ticketId;

    @ManyToOne
    @JoinColumn(name = "EventID", nullable = false)
    private Event event;

    @ManyToOne
    @JoinColumn(name = "UserID", nullable = false)
    private User user;

    @Column(name = "ticket_quantity", nullable = false)
    private int ticketQuantity;

    @Column(name = "total_price", nullable = false)
    private BigDecimal totalPrice;

    @Column(name = "purchase_date", nullable = false)
    private LocalDateTime purchaseDate;

    // Constructors
    public Ticket() {
    }

    public Ticket(Event event, User user, int ticketQuantity, BigDecimal totalPrice, LocalDateTime purchaseDate) {
        this.event = event;
        this.user = user;
        this.ticketQuantity = ticketQuantity;
        this.totalPrice = totalPrice;
        this.purchaseDate = purchaseDate;
    }

    // Getters and Setters
    public int getTicketId() {
        return ticketId;
    }

    public void setTicketId(int ticketId) {
        this.ticketId = ticketId;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public int getTicketQuantity() {
        return ticketQuantity;
    }

    public void setTicketQuantity(int ticketQuantity) {
        this.ticketQuantity = ticketQuantity;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public LocalDateTime getPurchaseDate() {
        return purchaseDate;
    }

    public void setPurchaseDate(LocalDateTime purchaseDate) {
        this.purchaseDate = purchaseDate;
    }

    // toString Method
    @Override
    public String toString() {
        return "Ticket{" +
                "ticketId=" + ticketId +
                ", event=" + event +
                ", user=" + user +
                ", ticketQuantity=" + ticketQuantity +
                ", totalPrice=" + totalPrice +
                ", purchaseDate=" + purchaseDate +
                '}';
    }
}
