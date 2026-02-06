package com.bus_pass.app.service;

import com.bus_pass.app.dao.BusPassDao;
import com.bus_pass.app.dao.PaymentDao;
import com.bus_pass.app.dao.UserDao;
import com.bus_pass.app.model.User;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    private final PaymentDao paymentDao;
    private final BusPassDao busPassDao;
    private final UserDao userDao;
    private final UserPassService userPassService;

    public PaymentService(
            PaymentDao paymentDao,
            BusPassDao busPassDao,
            UserDao userDao,
            UserPassService userPassService
    ) {
        this.paymentDao = paymentDao;
        this.busPassDao = busPassDao;
        this.userDao = userDao;
        this.userPassService = userPassService;
    }

    public void initiatePayment(int applicationId, String userEmail) {

        String status = busPassDao.getStatus(applicationId);

        if (!"APPROVED".equals(status)) {
            throw new RuntimeException("Payment allowed only after approval");
        }

        if (paymentDao.existsByApplicationId(applicationId)) {
            return;
        }

        String passType = busPassDao.getPassType(applicationId);
        User user = userDao.findByEmail(userEmail);

        double baseAmount = getBaseAmount(passType);
        double discount = getDiscount(user.getRole());

        double finalAmount = baseAmount - (baseAmount * discount);

        paymentDao.create(applicationId, finalAmount);
    }

    public void completePayment(int applicationId) {
        paymentDao.markPaid(applicationId);
        userPassService.generatePassIfNotExists(applicationId);
    }

    // ---------------- HELPERS ----------------

    private double getBaseAmount(String passType) {
        return switch (passType.toUpperCase()) {
            case "QUARTERLY" -> 1200;
            case "YEARLY" -> 4000;
            default -> 500; // MONTHLY
        };
    }

    private double getDiscount(String role) {
        return switch (role.toUpperCase()) {
            case "STUDENT" -> 0.20; // 20% discount
            default -> 0.0;
        };
    }
}