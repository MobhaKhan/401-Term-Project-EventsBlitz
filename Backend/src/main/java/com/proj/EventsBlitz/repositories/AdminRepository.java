package com.proj.EventsBlitz.repositories;

import com.proj.EventsBlitz.models.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AdminRepository extends JpaRepository<Admin, Integer> {
    // You can add custom queries here if needed
    @Query("SELECT CASE WHEN COUNT(u) > 0 THEN true ELSE false END FROM Admin u WHERE u.UserID = :UserID AND u.Pwd_Admin = :Pwd_Admin")
    boolean checkPasswordForUser(@Param("UserID") int userId, @Param("Pwd_Admin") String password);
}