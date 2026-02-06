package com.bus_pass.app.controller;

import com.bus_pass.app.service.UserPassService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserPassController {

    private final UserPassService userPassService;

    public UserPassController(UserPassService userPassService) {
        this.userPassService = userPassService;
    }

    @GetMapping("/pass")
    public Object getPass(@RequestParam String email) {
        return userPassService.getUserPass(email);
    }
}