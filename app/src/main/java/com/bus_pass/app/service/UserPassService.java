package com.bus_pass.app.service;

import com.bus_pass.app.dao.BusPassDao;
import com.bus_pass.app.dao.UserPassDao;
import com.bus_pass.app.model.UserPass;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class UserPassService {

    private final UserPassDao userPassDao;
    private final BusPassDao busPassDao;

    public UserPassService(UserPassDao userPassDao, BusPassDao busPassDao) {
        this.userPassDao = userPassDao;
        this.busPassDao = busPassDao;
    }

    public void generatePassIfNotExists(int applicationId) {

        // Do not generate duplicate pass
        if (userPassDao.existsByApplicationId(applicationId)) {
            return;
        }

        // Check application status
        String status = busPassDao.getStatus(applicationId);
        if (!"APPROVED".equalsIgnoreCase(status)) {
            return;
        }

        // Get pass type
        String passType = busPassDao.getPassType(applicationId);

        LocalDate startDate = LocalDate.now();
        LocalDate endDate = switch (passType.toUpperCase()) {
            case "QUARTERLY" -> startDate.plusMonths(3);
            case "YEARLY" -> startDate.plusYears(1);
            default -> // MONTHLY
                    startDate.plusMonths(1);
        };

        // Duration logic

        // Create pass
        userPassDao.create(applicationId, endDate);
    }

    /**
     * Returns the user's pass with dynamic EXPIRY check
     */
    public UserPass getUserPass(String email) {

        UserPass pass = userPassDao.findByUserEmail(email);

        if (pass == null) {
            return null;
        }

        // 🔥 Dynamic expiry logic
        if (LocalDate.now().isAfter(pass.getEndDate())) {
            pass.setStatus("EXPIRED");
        } else {
            pass.setStatus("ACTIVE");
        }

        return pass;
    }

    public List<UserPass> getAllPasses() {

        List<UserPass> passes = userPassDao.findAll();

        LocalDate today = LocalDate.now();

        for (UserPass pass : passes) {
            if (today.isAfter(pass.getEndDate())) {
                pass.setStatus("EXPIRED");
            } else {
                pass.setStatus("ACTIVE");
            }
        }

        return passes;
    }
}