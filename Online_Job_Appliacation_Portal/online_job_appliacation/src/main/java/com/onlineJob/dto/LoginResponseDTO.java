package com.onlineJob.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResponseDTO {
    private Integer id;
    private String name;
    private String email;
    private String role;
    private String message;
}
