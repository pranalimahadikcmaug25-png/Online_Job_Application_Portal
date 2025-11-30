package com.onlineJob.dto;

import com.onlineJob.entities.Application;
import lombok.Data;

@Data
public class ApplicationResponse {

    private Integer id;
    private String fullName;
    private String email;
    private String phone;
    private String status;

    public static ApplicationResponse fromEntity(Application app) {
        ApplicationResponse res = new ApplicationResponse();
        res.setId(app.getId());
        res.setFullName(app.getFullName());
        res.setEmail(app.getEmail());
        res.setPhone(app.getPhone());
        res.setStatus(app.getStatus().name());
        return res;
    }
}