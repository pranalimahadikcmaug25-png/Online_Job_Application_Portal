package com.onlineJob.dto;

import lombok.Data;

@Data
public class ApplicationRequest {
    private Integer jobId;
    private Integer applicantId;
    private String fullName;
    private String email;
    private String phone;
    private String education;
    private String experience;
    private String skills;
    private String resumeUrl;
    private String coverLetter;
}