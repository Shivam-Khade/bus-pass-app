package com.bus_pass.app.service;

import com.bus_pass.app.dao.BusPassDao;
import com.bus_pass.app.dto.BusPassApplyRequest;
import com.bus_pass.app.model.BusPassApplication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BusPassService {

    private final BusPassDao busPassDao;

    public BusPassService(BusPassDao busPassDao) {
        this.busPassDao = busPassDao;
    }

    public void apply(BusPassApplyRequest request) {
        BusPassApplication app = new BusPassApplication();
        app.setUserId(request.getUserId());
        app.setPassType(request.getPassType());
        app.setStatus("PENDING");

        busPassDao.apply(app);
    }

    public List<BusPassApplication> getAllApplications() {
        return busPassDao.getAllApplications();
    }

    public void updateStatus(int id, String status) {
        busPassDao.updateStatus(id, status);
    }

    public List<BusPassApplication> getUserApplications(int userId) {
        return busPassDao.getAllApplications().stream()
                .filter(app -> app.getUserId() == userId)
                .collect(Collectors.toList());
    }
}