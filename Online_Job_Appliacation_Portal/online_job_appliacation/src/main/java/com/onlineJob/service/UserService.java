package com.onlineJob.service;

import com.onlineJob.dto.CreateUserDTO;
import com.onlineJob.dto.LoginRequestDTO;
import com.onlineJob.dto.LoginResponseDTO;
import com.onlineJob.dto.UserDTO;

import java.util.List;

public interface UserService {

    UserDTO createUser(CreateUserDTO dto);

    UserDTO getUserById(Integer id);

    List<UserDTO> getAllUsers();

    UserDTO updateUser(Integer id, UserDTO dto);

    void deleteUser(Integer id);
    LoginResponseDTO login(LoginRequestDTO dto) ;

}

