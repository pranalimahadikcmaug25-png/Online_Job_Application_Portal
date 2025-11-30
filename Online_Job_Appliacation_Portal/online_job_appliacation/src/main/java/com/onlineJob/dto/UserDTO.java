package com.onlineJob.dto;

import com.onlineJob.enums.Userenums;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {

    private Integer id;
    private String name;
    private String email;
    private Userenums role;
    private String phone;
    private String avatar;
    private String bio;
    private String skills;
    private String education;
    private String experience;
    private String resumeUrl;
    private String companyName;
    private String companyWebsite;
    private Boolean isActive;
}
