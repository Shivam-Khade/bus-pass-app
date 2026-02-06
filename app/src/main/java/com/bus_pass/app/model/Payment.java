package com.bus_pass.app.model;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class Payment {
    private int id;
    private int applicationId;
    private double amount;
    private String status;
    private LocalDateTime paymentDate;
}
