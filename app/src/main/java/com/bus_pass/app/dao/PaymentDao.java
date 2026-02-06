package com.bus_pass.app.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class PaymentDao {

    private final JdbcTemplate jdbcTemplate;

    public PaymentDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public boolean existsByApplicationId(int applicationId) {
        String sql = "SELECT COUNT(*) FROM payments WHERE application_id = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, applicationId);
        return count != null && count > 0;
    }

    public void create(int applicationId, double amount) {
        String sql = """
            INSERT INTO payments (application_id, amount)
            VALUES (?, ?)
        """;
        jdbcTemplate.update(sql, applicationId, amount);
    }

    public void markPaid(int applicationId) {
        String sql = """
            UPDATE payments
            SET status = 'PAID', payment_date = NOW()
            WHERE application_id = ?
        """;
        jdbcTemplate.update(sql, applicationId);
    }
}
