// src/main/java/com/sample/example/service/UserService.java
package com.proj.EventsBlitz.services;

import com.proj.EventsBlitz.models.*;
import com.proj.EventsBlitz.repositories.*;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Map;
import java.util.HashMap;


import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    @Autowired
    private RegisteredUserRepository registeredUserRepository;
    @Autowired GuestUserRepository guestUserRepository;
    @Autowired
    private AdminRepository adminRepository;

    public Map<String, String> loginRegisteredUser(HttpServletResponse httpServletResponse, String email, String password) {
        Map<String, String> response = new HashMap<>();

        User user = userRepository.findByUserEmail(email);
        
        if (user != null) {
            // Check if the user is of type 'Guest'
            if ("Guest".equals(user.getUserType())) {
                response.put("error", "This is a guest user");
                return response;
            }

            boolean valid = registeredUserRepository.checkPasswordForUser(user.getUserID(), password);

            Cookie cookie;

            if (valid) {
                cookie = new Cookie("token", "true");
                response.put("userID", String.valueOf(user.getUserID()));
            } else {
                cookie = new Cookie("token", "false");
            }

            httpServletResponse.addCookie(cookie);
        } else {
            // Handle the case when the user is not found by email
            response.put("error", "User not found");
        }

        return response;
    }

    public Map<String, String> loginAdmin(HttpServletResponse httpServletResponse, String email, String password) {
        Map<String, String> response = new HashMap<>();

        User user = userRepository.findByUserEmail(email);

        if (user != null) {
            boolean valid = adminRepository.checkPasswordForUser(user.getUserID(), password);

            Cookie cookie;

            if (valid) {
                cookie = new Cookie("token", "true");
                response.put("userID", String.valueOf(user.getUserID()));
            } else {
                cookie = new Cookie("token", "false");
            }

            httpServletResponse.addCookie(cookie);
        } else {
            // Handle the case when the user is not found by email
            response.put("error", "User not found");
        }

        return response;
    }

    public User createRegisteredUser(User user, String password, String creditCard) {
        User savedUser = userRepository.save(user);

        // Check if the user is of type 'Registered'
        if ("Registered".equals(savedUser.getUserType())) {
            RegisteredUser registeredUser = new RegisteredUser();
            registeredUser.setUserID(savedUser.getUserID());
            registeredUser.setPwd_RegisteredUser(password);
            // Set other fields as needed

            registeredUser.setCreditCardNumber(creditCard);

            registeredUserRepository.save(registeredUser);
        }

        return savedUser;
    }
    
    public User createAdmin(User user, String password) {
        User savedUser = userRepository.save(user);

        // Check if the user is of type 'Registered'
        if ("Admin".equals(savedUser.getUserType())) {
            Admin admin = new Admin();
            admin.setUserID(savedUser.getUserID());
            admin.setPwdAdmin(password);

            adminRepository.save(admin);
        }

        return savedUser;
    }
    public User createGuestUser(User user) {
        User savedUser = userRepository.save(user);

        // Check if the user is of type 'Guest'
        if ("Guest".equals(savedUser.getUserType())) {
            GuestUser guestUser = new GuestUser();
            guestUser.setUserID(savedUser.getUserID());

            guestUserRepository.save(guestUser);
        }

        return savedUser;
    }

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(int id) {
        return userRepository.findById(id);
    }

    public void deleteRegisteredUser(int id) {
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isPresent()) {
            User savedUser = optionalUser.get();

            if ("Registered".equalsIgnoreCase(savedUser.getUserType())) {
                // Delete from RegisteredUser table
                registeredUserRepository.deleteById(id);
            }

            // Delete from User table
            userRepository.deleteById(id);
        }
    }

    public void deleteAdmin(int id) {
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isPresent()) {
            User savedUser = optionalUser.get();

            if ("Admin".equalsIgnoreCase(savedUser.getUserType())) {
                // Delete from Admin table
                adminRepository.deleteById(id);
            }

            // Delete from User table
            userRepository.deleteById(id);
        }
    }
    public void deleteGuestUser(int id) {
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isPresent()) {
            User savedUser = optionalUser.get();

            if ("Guest".equalsIgnoreCase(savedUser.getUserType())) {
                // Delete from Guest User table
                guestUserRepository.deleteById(id);
            }

            // Delete from User table
            userRepository.deleteById(id);
        }
    }


}