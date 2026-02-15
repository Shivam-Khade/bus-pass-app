package com.bus_pass.app.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendEmail(String toEmail, String subject, String body) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject(subject);
            message.setText(body);

            mailSender.send(message);

            System.out.println("✅ Email sent successfully to " + toEmail);

        } catch (Exception e) {
            System.err.println("❌ Failed to send email to " + toEmail + ": " + e.getMessage());
            // Fallback: print OTP to console for development/testing
            System.out.println("----- SIMULATED EMAIL (FALLBACK) -----");
            System.out.println("To: " + toEmail);
            System.out.println("Subject: " + subject);
            System.out.println("Body: " + body);
            System.out.println("--------------------------------------");
        }
    }
}
