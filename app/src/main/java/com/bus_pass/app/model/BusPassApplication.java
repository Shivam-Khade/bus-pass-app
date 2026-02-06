package com.bus_pass.app.model;


import lombok.Data;

@Data
public class BusPassApplication {
    private int id;
    private int userId;
    private String passType;
    private String status;
}