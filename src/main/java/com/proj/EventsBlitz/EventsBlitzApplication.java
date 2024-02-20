package com.proj.EventsBlitz;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.proj.EventsBlitz.repositories.*;
import com.proj.EventsBlitz.models.User;


import java.util.List;

@SpringBootApplication
public class EventsBlitzApplication implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    public static void main(String[] args) {
        SpringApplication.run(EventsBlitzApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        List<User> users = userRepository.findAll();
        for (User user : users) {
            System.out.println(user.toString());
        }
    }
}
