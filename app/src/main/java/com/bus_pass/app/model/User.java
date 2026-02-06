package com.bus_pass.app.model;

import lombok.Data;

@Data
public class User {
    private int id;
    private String name;
    private String email;
    private String password;
    private String role;
    private String phone;

    // required for admin remove (soft delete)
    private boolean active;
}
