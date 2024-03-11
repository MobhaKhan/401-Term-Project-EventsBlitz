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

    public RegisteredUser() {

    }

    public RegisteredUser(int userID, String pwd_RegisteredUser, String creditCardNumber) {
        UserID = userID;
        Pwd_RegisteredUser = pwd_RegisteredUser;
        CreditCardNumber = creditCardNumber;
    }

    @Override
    public String toString() {
        return RegisteredUserID + " -> " + UserID + " -> " + Pwd_RegisteredUser + " -> "
                + CreditCardNumber;
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

}