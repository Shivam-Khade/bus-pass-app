package com.bus_pass.app.controller;

import com.bus_pass.app.service.OtpService;
import com.bus_pass.app.dto.LoginResponse;
import com.bus_pass.app.service.UserService;
import com.bus_pass.app.util.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class OtpController {

    private final OtpService otpService;
    private final UserService userService;
    private final JwtUtil jwtUtil;

    public OtpController(OtpService otpService, UserService userService, JwtUtil jwtUtil) {
        this.otpService = otpService;
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/send-otp")
    public ResponseEntity<String> sendOtp(@RequestParam String email) {
        try {
            otpService.generateAndSendOtp(email);
            return ResponseEntity.ok("OTP sent successfully to " + email);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error sending OTP: " + e.getMessage());
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtpAndLogin(@RequestParam String email, @RequestParam String otp) {
        boolean isValid = otpService.validateOtp(email, otp);

        if (isValid) {
            // Check if user exists to generate token (similar to login)
            // If user doesn't exist, we might just return success status so frontend can
            // proceed to registration
            // OR if this is for login, we generate token.

            try {
                var userProfile = userService.getProfile(email);
                // User exists, generate token
                final String jwt = jwtUtil.generateToken(email);
                return ResponseEntity.ok(new LoginResponse(
                        userProfile.getId(),
                        userProfile.getEmail(),
                        userProfile.getRole(),
                        userProfile.getName(),
                        jwt,
                        userProfile.getAdharUrl(),
                        userProfile.getBonafideUrl(),
                        userProfile.getPhotoUrl(),
                        userProfile.getAddress()));
            } catch (Exception e) {
                // User might not exist yet (e.g., verification during registration)
                // Just return success message
                return ResponseEntity.ok("OTP verified successfully.");
            }
        } else {
            return ResponseEntity.status(400).body("Invalid or expired OTP");
        }
    }
}
