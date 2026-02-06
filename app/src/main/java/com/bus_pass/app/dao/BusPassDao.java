package com.bus_pass.app.dao;

import com.bus_pass.app.model.BusPassApplication;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BusPassDao {

    private final JdbcTemplate jdbcTemplate;

    public BusPassDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void apply(BusPassApplication app) {
        String sql = """
            INSERT INTO bus_pass_applications (user_id, pass_type, status)
            VALUES (?, ?, ?)
        """;

        jdbcTemplate.update(
                sql,
                app.getUserId(),
                app.getPassType(),
                app.getStatus()
        );
    }

    public List<BusPassApplication> getAllApplications() {
        String sql = "SELECT * FROM bus_pass_applications";

        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            BusPassApplication app = new BusPassApplication();
            app.setId(rs.getInt("id"));
            app.setUserId(rs.getInt("user_id"));
            app.setPassType(rs.getString("pass_type"));
            app.setStatus(rs.getString("status"));
            return app;
        });
    }

    public void updateStatus(int id, String status) {
        String sql = "UPDATE bus_pass_applications SET status = ? WHERE id = ?";
        jdbcTemplate.update(sql, status, id);
    }

    public String getStatus(int applicationId) {
        String sql = """
        SELECT status
        FROM bus_pass_applications
        WHERE id = ?
    """;

        return jdbcTemplate.queryForObject(sql, String.class, applicationId);
    }

    public String getPassType(int applicationId) {
        String sql = """
        SELECT pass_type
        FROM bus_pass_applications
        WHERE id = ?
    """;

        return jdbcTemplate.query(
                sql,
                rs -> rs.next() ? rs.getString("pass_type") : null,
                applicationId
        );
    }

}