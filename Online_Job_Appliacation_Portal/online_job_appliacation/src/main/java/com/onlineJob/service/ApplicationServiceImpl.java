package com.onlineJob.service;

import com.onlineJob.dto.ApplicationRequest;
import com.onlineJob.dto.ApplicationResponse;
import com.onlineJob.entities.Application;
import com.onlineJob.entities.Job;
import com.onlineJob.entities.User;
import com.onlineJob.enums.ApplicationStatus;
import com.onlineJob.repository.ApplicationRepository;
import com.onlineJob.repository.JobRepository;
import com.onlineJob.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationServiceImpl implements ApplicationService {

    private final ApplicationRepository repo;
    private final JobRepository jobRepo;
    private final UserRepository userRepo;

    public ApplicationServiceImpl(ApplicationRepository repo,
                                  JobRepository jobRepo,
                                  UserRepository userRepo) {
        this.repo = repo;
        this.jobRepo = jobRepo;
        this.userRepo = userRepo;
    }

    // Apply for Job
    @Override
    public ApplicationResponse apply(ApplicationRequest req) {
        Job job = jobRepo.findById(req.getJobId())
                .orElseThrow(() -> new RuntimeException("Job not found"));
        User applicant = userRepo.findById(req.getApplicantId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Application app = Application.builder()
                .applicant(applicant)
                .job(job)
                .fullName(req.getFullName())
                .email(req.getEmail())
                .phone(req.getPhone())
                .education(req.getEducation())
                .skills(req.getSkills())
                .experience(req.getExperience())
                .resumeUrl(req.getResumeUrl())
                .coverLetter(req.getCoverLetter())
                .status(ApplicationStatus.Pending)
                .build();

        Application savedApp = repo.save(app);
        return ApplicationResponse.fromEntity(savedApp);
    }

    // Get Applications by Job
    @Override
    public List<ApplicationResponse> getApplicationsByJob(Integer jobId) {
        List<Application> apps = repo.findByJob_Id(jobId);
        return apps.stream()
                .map(ApplicationResponse::fromEntity)
                .toList();
    }

    // Get Applications by Applicant
    @Override
    public List<ApplicationResponse> getApplicationsByApplicant(Integer applicantId) {
        List<Application> apps = repo.findByApplicant_Id(applicantId);
        return apps.stream()
                .map(ApplicationResponse::fromEntity)
                .toList();
    }

    // Update Status
    @Override
    public ApplicationResponse updateStatus(Integer id, ApplicationStatus status) {
        Application app = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        app.setStatus(status);
        Application updatedApp = repo.save(app);
        return ApplicationResponse.fromEntity(updatedApp);
    }

    // Delete Application
    @Override
    public void deleteApplication(Integer id) {
        repo.deleteById(id);
    }

    // Get Application by ID
    @Override
    public ApplicationResponse getById(Integer id) {
        Application app = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        return ApplicationResponse.fromEntity(app);
    }
}