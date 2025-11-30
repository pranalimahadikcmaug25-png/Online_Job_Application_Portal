package com.onlineJob.repository;

import com.onlineJob.entities.Job;
import com.onlineJob.enums.JobType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Integer> {

    List<Job> findByIsActiveTrue();
    List<Job> findByJobType(JobType jobType);
    List<Job> findByTitleContainingIgnoreCase(String keyword);
}