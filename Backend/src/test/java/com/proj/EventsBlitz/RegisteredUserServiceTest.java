package com.proj.EventsBlitz;



import com.proj.EventsBlitz.models.RegisteredUser;
import com.proj.EventsBlitz.repositories.RegisteredUserRepository;
import com.proj.EventsBlitz.services.RegisteredUserService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class RegisteredUserServiceTest {

    @Mock
    private RegisteredUserRepository registeredUserRepository;

    @InjectMocks
    private RegisteredUserService registeredUserService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testGetAllRegisteredUsers() {
        // Mocking service response
        List<RegisteredUser> registeredUsers = Arrays.asList(new RegisteredUser(), new RegisteredUser());
        when(registeredUserRepository.findAll()).thenReturn(registeredUsers);

        // Performing the actual method call
        List<RegisteredUser> result = registeredUserService.getAllRegisteredUsers();

        // Verifying the result
        assertEquals(2, result.size());
    }


    @Test
    void testCreateRegisteredUser() {
        RegisteredUser registeredUser = new RegisteredUser();
        when(registeredUserRepository.save(any(RegisteredUser.class))).thenReturn(registeredUser);

        // Performing the actual method call
        RegisteredUser result = registeredUserService.createRegisteredUser(new RegisteredUser());

        // Verifying the result
        assertEquals(registeredUser, result);
    }

    @Test
    void testDeleteRegisteredUser() {
        int registeredUserId = 1;

        // Performing the actual method call
        registeredUserService.deleteRegisteredUser(registeredUserId);

        // Verifying that the deleteRegisteredUser method of the repository was called with the correct ID
        verify(registeredUserRepository, times(1)).deleteById(registeredUserId);
    }
}

