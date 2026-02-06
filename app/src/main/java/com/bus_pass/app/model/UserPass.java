package com.bus_pass.app.model;

import lombok.Data;
import java.time.LocalDate;

@Data
public class UserPass {
    private int id;
    private int applicationId;
    private String passNumber;
    private LocalDate startDate;
    private LocalDate endDate;
    private String status;
}