package com.bus_pass.app.service;

import com.bus_pass.app.dao.UserDao;
import com.bus_pass.app.dto.LoginRequest;
import com.bus_pass.app.dto.LoginResponse;
import com.bus_pass.app.dto.RegisterRequest;
import com.bus_pass.app.dto.UserProfileResponse;
import com.bus_pass.app.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class UserService {

    private final UserDao userDao;
    private final org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    public UserService(UserDao userDao, org.springframework.security.crypto.password.PasswordEncoder passwordEncoder) {
        this.userDao = userDao;
        this.passwordEncoder = passwordEncoder;
    }

    public void register(RegisterRequest request) {
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword())); // BCrypt hashed password
        user.setRole(request.getRole());
        user.setPhone(request.getPhone());

        userDao.save(user);
    }

    public UserProfileResponse getProfile(String email) {
        User user = userDao.getProfileByEmail(email);

        UserProfileResponse res = new UserProfileResponse();
        res.setId(user.getId());
        res.setName(user.getName());
        res.setEmail(user.getEmail());
        res.setRole(user.getRole());
        res.setPhone(user.getPhone());

        return res;
    }

    public boolean isAdmin(String email) {
        String role = userDao.getRoleByEmail(email);

        if (role == null) {
            return false;
        }

        return "ADMIN".equalsIgnoreCase(role);
    }

    public List<User> getAllUsers() {
        return userDao.findAll();
    }

    public void removeUser(int userId) {
        userDao.deactivateUser(userId);
    }

    public User getUserByEmail(String email) {
        return userDao.findByEmail(email);
    }
}