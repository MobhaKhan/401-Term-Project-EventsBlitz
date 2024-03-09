// src/main/java/com/sample/example/model/User.java
package com.proj.EventsBlitz.models;

import jakarta.persistence.*;

@Entity
@Table(name = "RegisteredUser")
public class RegisteredUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RegisteredUserID", nullable = false)
    private int RegisteredUserID;
    @Column(name = "UserID", nullable = false)
    private int UserID;
    @Column(name = "Pwd_RegisteredUser", nullable = false)
    private String Pwd_RegisteredUser;
    @Column(name = "CreditCardNumber", nullable = false)
    private String CreditCardNumber;
    @Column(name = "MonthlyPromotionNews", nullable = false)
    private boolean MonthlyPromotionNews;
    @Column(name = "AirportLoungeDiscount", nullable = false)
    private boolean AirportLoungeDiscount;
    @Column(name = "CompanionTicketCount", nullable = false)
    private int CompanionTicketCount;

    public RegisteredUser() {

    }

    public RegisteredUser(int userID, String pwd_RegisteredUser, String creditCardNumber, boolean monthlyPromotionNews, boolean airportLoungeDiscount, int companionTicketCount) {
        UserID = userID;
        Pwd_RegisteredUser = pwd_RegisteredUser;
        CreditCardNumber = creditCardNumber;
        MonthlyPromotionNews = monthlyPromotionNews;
        AirportLoungeDiscount = airportLoungeDiscount;
        CompanionTicketCount = companionTicketCount;
    }

    @Override
    public String toString() {
        return RegisteredUserID + " -> " + UserID + " -> " + Pwd_RegisteredUser + " -> "
                + CreditCardNumber + " -> " + MonthlyPromotionNews + " -> "
                + AirportLoungeDiscount + " -> " + CompanionTicketCount;
    }

    public void setUserID(int userID) {
        this.UserID = userID;
    }

    public void setPwd_RegisteredUser(String defaultPassword) {
        this.Pwd_RegisteredUser = defaultPassword;
    }

    public void setCreditCardNumber(String defaultCreditCard) {
        this.CreditCardNumber = defaultCreditCard;
    }

    public void setMonthlyPromotionNews(boolean b) {
        this.MonthlyPromotionNews = b;
    }

    public void setAirportLoungeDiscount(boolean b) {
        this.AirportLoungeDiscount = b;
    }

    public void setCompanionTicketCount(int i) {
        this.CompanionTicketCount = i;
    }

}