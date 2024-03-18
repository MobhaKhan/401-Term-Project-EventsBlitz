// src/main/java/com/sample/example/repository/UserRepository.java
package com.proj.EventsBlitz.repositories;

import com.proj.EventsBlitz.models.RegisteredUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RegisteredUserRepository extends JpaRepository<RegisteredUser, Integer> {
    // You can add custom queries here if needed
    @Query("SELECT CASE WHEN COUNT(u) > 0 THEN true ELSE false END FROM RegisteredUser u WHERE u.UserID = :UserID AND u.Pwd_RegisteredUser = :Pwd_RegisteredUser")
    boolean checkPasswordForUser(@Param("UserID") int userId, @Param("Pwd_RegisteredUser") String password);
}