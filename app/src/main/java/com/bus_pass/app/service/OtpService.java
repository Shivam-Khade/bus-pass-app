package com.bus_pass.app.service;

import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Service
public class OtpService {

    private final EmailService emailService;
    private final Map<String, String> otpStorage = new ConcurrentHashMap<>();
    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
    private static final int OTP_VALIDITY_MINUTES = 5;

    public OtpService(EmailService emailService) {
        this.emailService = emailService;
    }

    public void generateAndSendOtp(String email) {
        String otp = generateOtp();
        otpStorage.put(email, otp);

        // Schedule removal of OTP after validity period
        scheduler.schedule(() -> otpStorage.remove(email), OTP_VALIDITY_MINUTES, TimeUnit.MINUTES);

        String subject = "Your OTP for Bus Pass App";
        String body = "Your OTP is: " + otp + "\nIt is valid for " + OTP_VALIDITY_MINUTES + " minutes.";

        emailService.sendEmail(email, subject, body);
    }

    public boolean validateOtp(String email, String otp) {
        if (email == null || otp == null) {
            return false;
        }
        String storedOtp = otpStorage.get(email);
        if (storedOtp != null && storedOtp.equals(otp)) {
            otpStorage.remove(email); // OTP is one-time use
            return true;
        }
        return false;
    }

    private String generateOtp() {
        SecureRandom random = new SecureRandom();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }
}
