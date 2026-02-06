package com.bus_pass.app.controller;

import com.bus_pass.app.dto.BusPassApplyRequest;
import com.bus_pass.app.model.BusPassApplication;
import com.bus_pass.app.service.BusPassService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/pass")
public class BusPassController {

    private final BusPassService busPassService;

    public BusPassController(BusPassService busPassService) {
        this.busPassService = busPassService;
    }

    @PostMapping("/apply")
    public ResponseEntity<String> apply(@RequestBody BusPassApplyRequest request) {
        busPassService.apply(request);
        return ResponseEntity.ok("Bus pass application submitted");
    }

    @GetMapping("/my-applications/{userId}")
    public ResponseEntity<List<BusPassApplication>> getMyApplications(@PathVariable int userId) {
        List<BusPassApplication> applications = busPassService.getUserApplications(userId);
        return ResponseEntity.ok(applications);
    }

    // Admin endpoints
    @GetMapping("/admin/all")
    public ResponseEntity<List<BusPassApplication>> getAllApplications() {
        List<BusPassApplication> applications = busPassService.getAllApplications();
        return ResponseEntity.ok(applications);
    }

    @PutMapping("/admin/update-status/{id}")
    public ResponseEntity<String> updateStatus(@PathVariable int id, @RequestBody Map<String, String> request) {
        String status = request.get("status");
        busPassService.updateStatus(id, status);
        return ResponseEntity.ok("Status updated successfully");
    }
}