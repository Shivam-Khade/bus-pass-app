package com.bus_pass.app.controller;

import com.bus_pass.app.model.BusPassApplication;
import com.bus_pass.app.model.User;
import com.bus_pass.app.model.UserPass;
import com.bus_pass.app.service.BusPassService;
import com.bus_pass.app.service.UserPassService;
import com.bus_pass.app.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;


@RestController
@RequestMapping("/admin")
public class AdminController {

    private final BusPassService busPassService;
    private final UserService userService;
    private final UserPassService userPassService;

    public AdminController(BusPassService busPassService, UserService userService, UserPassService userPassService) {
        this.busPassService = busPassService;
        this.userService = userService;
        this.userPassService = userPassService;
    }

    @GetMapping("/users")
    public List<User> getAllUsers(@RequestParam String adminEmail) {

        if (!userService.isAdmin(adminEmail)) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Access denied: Admin only"
            );
        }

        return userService.getAllUsers();
    }

    @DeleteMapping("/users/{userId}")
    public String removeUser(
            @PathVariable int userId,
            @RequestParam String adminEmail
    ) {
        if (!userService.isAdmin(adminEmail)) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Admin only"
            );
        }

        userService.removeUser(userId);
        return "User deactivated successfully";
    }

    @GetMapping("/passes")
    public List<UserPass> getAllPasses(@RequestParam String adminEmail) {

        if (!userService.isAdmin(adminEmail)) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Access denied: Admin only"
            );
        }

        return userPassService.getAllPasses();
    }

    @GetMapping("/applications")
    public List<BusPassApplication> getAllApplications(
            @RequestParam String adminEmail
    ) {
        if (!userService.isAdmin(adminEmail)) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Access denied: Admin only"
            );

        }

        return busPassService.getAllApplications();
    }

    @PostMapping("/update-status")
    public String updateStatus(
            @RequestParam String adminEmail,
            @RequestParam int applicationId,
            @RequestParam String status
    ) {
        if (!userService.isAdmin(adminEmail)) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Access denied: Admin only"
            );
        }

        busPassService.updateStatus(applicationId, status);
        return "Status updated to " + status;
    }
}