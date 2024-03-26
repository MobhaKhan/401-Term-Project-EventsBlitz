// src/main/java/com/sample/example/model/User.java
package com.proj.EventsBlitz.models;

import jakarta.persistence.*;

@Entity
@Table(name = "User")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UserID", nullable = false)
    private int UserID;
    @Column(name = "UserName", nullable = false)
    private String UserName;
    @Column(name = "UserAddress", nullable = false)
    private String UserAddress;
    @Column(name = "Email", nullable = false)
    private String Email;
    @Column(name = "UserType", nullable = false)
    private String UserType;

    public User() {

    }

    public User(String userName, String userAddress, String email, String userType)
    {
        this.UserName = userName;
        this.UserAddress = userAddress;
        this.Email = email;
        this.UserType = userType;
    }

    @Override
    public String toString() {
        return UserID + " -> " + UserName + " -> " + UserAddress + " -> " + Email + " -> " + UserType + "\n";
    }

    public String getUserType() {
        return this.UserType;
    }

    public int getUserID() {
        return this.UserID;
    }

    public void setUserType(String string) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setUserType'");
    }

    public void setEmail(String string) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setEmail'");
    }

    // getters and setters, constructors
}