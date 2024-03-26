package com.proj.EventsBlitz.services;

import com.proj.EventsBlitz.models.GuestUser;
import com.proj.EventsBlitz.repositories.GuestUserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class GuestUserServiceTest {

    private GuestUserRepository guestUserRepository;
    private GuestUserService guestUserService;

    @BeforeEach
    void setUp() {
        guestUserRepository = Mockito.mock(GuestUserRepository.class);
        guestUserService = new GuestUserService(guestUserRepository);
    }

    @Test
    void whenGetAllGuestUsersCalled_thenRepositoryFindAllCalled() {
        GuestUser guestUser1 = new GuestUser(); // Assume GuestUser has a no-args constructor
        GuestUser guestUser2 = new GuestUser();
        when(guestUserRepository.findAll()).thenReturn(Arrays.asList(guestUser1, guestUser2));
        
        List<GuestUser> guestUsers = guestUserService.getAllGuestUsers();
        
        assertNotNull(guestUsers);
        assertEquals(2, guestUsers.size());
        verify(guestUserRepository).findAll();
    }


    @Test
    void whenCreateGuestUserCalled_thenGuestUserSaved() {
        GuestUser guestUser = new GuestUser();
        when(guestUserRepository.save(guestUser)).thenReturn(guestUser);
        
        GuestUser createdGuestUser = guestUserService.createGuestUser(guestUser);
        
        assertNotNull(createdGuestUser);
        verify(guestUserRepository).save(guestUser);
    }

    @Test
    void whenDeleteGuestUserCalled_thenRepositoryDeleteCalled() {
        int guestUserId = 1;
        doNothing().when(guestUserRepository).deleteById(guestUserId);
        
        guestUserService.deleteGuestUser(guestUserId);
        
        verify(guestUserRepository).deleteById(guestUserId);
    }
}
