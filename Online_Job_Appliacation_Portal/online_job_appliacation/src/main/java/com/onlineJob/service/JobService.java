package com.onlineJob.service;

import java.util.List;
import com.onlineJob.dto.JobRequestDTO;
import com.onlineJob.dto.JobResponseDTO;

public interface JobService {

    List<JobResponseDTO> getAllJobs();
    JobResponseDTO getJobById(Integer id);
    String createJob(JobRequestDTO jobRequestDTO);
    String deleteJob(Integer id);
}