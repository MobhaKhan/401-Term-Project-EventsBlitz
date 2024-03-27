package com.proj.EventsBlitz.services;

import com.proj.EventsBlitz.models.RegisteredUser;
import com.proj.EventsBlitz.models.User;
import com.proj.EventsBlitz.repositories.RegisteredUserRepository;
import com.proj.EventsBlitz.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private RegisteredUserRepository registeredUserRepository;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateRegisteredUser() {
        // Arrange
        User user = new User();
        user.setUserType("Registered");
        user.setEmail("test@example.com");

        RegisteredUser registeredUser = new RegisteredUser();
        registeredUser.setUserID(1);
        registeredUser.setPwd_RegisteredUser("password123");
        registeredUser.setCreditCardNumber("1234567890123456");

        when(userRepository.save(any(User.class))).thenReturn(user);
        when(registeredUserRepository.save(any(RegisteredUser.class))).thenReturn(registeredUser);

        // Act
        User savedUser = userService.createRegisteredUser(user, "password123", "1234567890123456");

        // Assert
        assertNotNull(savedUser, "The saved user should not be null");
        assertEquals("Registered", savedUser.getUserType(), "The user type should be 'Registered'");
        verify(userRepository).save(any(User.class));
        verify(registeredUserRepository).save(any(RegisteredUser.class));
    }
}
