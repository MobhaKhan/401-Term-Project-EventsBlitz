package com.proj.EventsBlitz.services;

import com.proj.EventsBlitz.models.Admin;
import com.proj.EventsBlitz.repositories.AdminRepository;
import com.proj.EventsBlitz.services.AdminService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Arrays;
import java.util.List;

class AdminServiceTest {

    @Mock
    private AdminRepository adminRepository;

    @InjectMocks
    private AdminService adminService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getAllAdminsTest() {
        // Arrange
        Admin admin1 = new Admin(); // Assuming Admin has a no-arg constructor
        Admin admin2 = new Admin();
        List<Admin> expectedAdmins = Arrays.asList(admin1, admin2);
        when(adminRepository.findAll()).thenReturn(expectedAdmins);

        // Act
        List<Admin> actualAdmins = adminService.getAllAdmins();

        // Assert
        assertEquals(expectedAdmins, actualAdmins, "The expected and actual lists of admins should match");
        verify(adminRepository, times(1)).findAll();
    }
}
