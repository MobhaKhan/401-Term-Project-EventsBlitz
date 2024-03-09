// src/main/java/com/sample/example/model/Admin.java
package com.proj.EventsBlitz.models;

import jakarta.persistence.*;

@Entity
@Table(name = "AdminTable")
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "AdminID", nullable = false)
    private int AdminID;

    @Column(name = "UserID", unique = true, nullable = false)
    private int UserID;

    @Column(name = "Pwd_Admin", nullable = false)
    private String Pwd_Admin;

    public Admin() {
    }

    public Admin(int userID, String pwdAdmin) {
        this.UserID = userID;
        this.Pwd_Admin = pwdAdmin;
    }

    @Override
    public String toString() {
        return "Admin ID: " + AdminID + " -> " + "User ID: " + UserID + " -> " + "Admin Password: " + Pwd_Admin;
        // Add other admin-related fields as needed
    }

    public void setUserID(int userID) {
        this.UserID = userID;
    }

    public void setPwdAdmin(String pwdAdmin) {
        this.Pwd_Admin = pwdAdmin;
    }
}