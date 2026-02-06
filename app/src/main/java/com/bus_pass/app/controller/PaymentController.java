package com.bus_pass.app.controller;

import com.bus_pass.app.service.PaymentService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    // Step 1: Initiate payment (amount decided by backend)
    @PostMapping("/initiate")
    public String initiatePayment(
            @RequestParam int applicationId,
            @RequestParam String userEmail
    ) {
        paymentService.initiatePayment(applicationId, userEmail);
        return "Payment initiated successfully (UNPAID)";
    }

    // Step 2: Complete payment
    @PostMapping("/pay")
    public String completePayment(
            @RequestParam int applicationId
    ) {
        paymentService.completePayment(applicationId);
        return "Payment successful (PAID)";
    }
}