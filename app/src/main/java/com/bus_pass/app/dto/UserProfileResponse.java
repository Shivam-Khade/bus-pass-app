package com.bus_pass.app.dto;

import lombok.Data;

@Data
public class UserProfileResponse {
    private int id;
    private String name;
    private String email;
    private String role;
    private String phone;
}
