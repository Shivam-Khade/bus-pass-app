package com.bus_pass.app.controller;

import com.bus_pass.app.dto.LoginRequest;
import com.bus_pass.app.dto.LoginResponse;
import com.bus_pass.app.dto.RegisterRequest;
import com.bus_pass.app.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final org.springframework.security.authentication.AuthenticationManager authenticationManager;
    private final com.bus_pass.app.util.JwtUtil jwtUtil;

    public AuthController(UserService userService,
            org.springframework.security.authentication.AuthenticationManager authenticationManager,
            com.bus_pass.app.util.JwtUtil jwtUtil) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        userService.register(request);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        authenticationManager.authenticate(
                new org.springframework.security.authentication.UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()));
        final String jwt = jwtUtil.generateToken(request.getEmail());

        var userProfile = userService.getProfile(request.getEmail());

        return ResponseEntity.ok(new LoginResponse(userProfile.getId(), userProfile.getEmail(), userProfile.getRole(),
                userProfile.getName(), jwt));
    }
}