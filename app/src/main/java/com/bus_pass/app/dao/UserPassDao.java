package com.bus_pass.app.dao;

import com.bus_pass.app.model.UserPass;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public class UserPassDao {

    private final JdbcTemplate jdbcTemplate;

    public UserPassDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public boolean existsByApplicationId(int applicationId) {
        String sql = "SELECT COUNT(*) FROM user_passes WHERE application_id = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, applicationId);
        return count != null && count > 0;
    }

    public void create(int applicationId, LocalDate endDate) {
        String passNumber = "PASS-" + System.currentTimeMillis();
        LocalDate start = LocalDate.now();

        String sql = """
        INSERT INTO user_passes
        (application_id, pass_number, start_date, end_date)
        VALUES (?, ?, ?, ?)
    """;

        jdbcTemplate.update(sql, applicationId, passNumber, start, endDate);
    }


    public UserPass findByUserEmail(String email) {
        String sql = """
            SELECT up.*
            FROM user_passes up
            JOIN bus_pass_applications ba ON up.application_id = ba.id
            JOIN users u ON ba.user_id = u.id
            WHERE u.email = ?
        """;

        return jdbcTemplate.query(sql, rs -> {
            if (!rs.next()) return null;

            UserPass pass = new UserPass();
            pass.setId(rs.getInt("id"));
            pass.setApplicationId(rs.getInt("application_id"));
            pass.setPassNumber(rs.getString("pass_number"));
            pass.setStartDate(rs.getDate("start_date").toLocalDate());
            pass.setEndDate(rs.getDate("end_date").toLocalDate());
            pass.setStatus(rs.getString("status"));
            return pass;
        }, email);
    }

    public List<UserPass> findAll() {
        String sql = """
        SELECT up.id, up.pass_number, up.start_date, up.end_date,
               u.email, u.role
        FROM user_passes up
        JOIN bus_pass_applications bpa ON up.application_id = bpa.id
        JOIN users u ON bpa.user_id = u.id
    """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            UserPass pass = new UserPass();
            pass.setId(rs.getInt("id"));
            pass.setPassNumber(rs.getString("pass_number"));
            pass.setStartDate(rs.getDate("start_date").toLocalDate());
            pass.setEndDate(rs.getDate("end_date").toLocalDate());
            return pass;
        });
    }

}
