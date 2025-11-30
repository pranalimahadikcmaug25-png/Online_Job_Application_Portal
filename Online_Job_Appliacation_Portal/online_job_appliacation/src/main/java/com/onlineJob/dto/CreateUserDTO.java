package com.onlineJob.dto;

import com.onlineJob.enums.Userenums;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateUserDTO {

    private String name;
    private String email;
    private String password;
    private Userenums role;
    private String phone;
}
