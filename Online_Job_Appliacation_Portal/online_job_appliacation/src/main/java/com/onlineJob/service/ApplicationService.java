package com.onlineJob.service;

// used to receive data from the client when applying for a job.
import com.onlineJob.dto.ApplicationRequest;
import com.onlineJob.dto.ApplicationResponse;
import com.onlineJob.enums.ApplicationStatus;

// Entity, represents a job application stored in the database.
import com.onlineJob.entities.Application;

//Enum, stores the status of the application
import com.onlineJob.enums.ApplicationStatus;

// Java List used to return multiple objects.
import java.util.List;

public interface ApplicationService {

	// apply method takes ApplicationReq DTO --> converts into Application Entity (default status)  
	// --> saves to db --> return saved entity
    ApplicationResponse apply(ApplicationRequest req);

    
    // all application for a specific job 
    List<ApplicationResponse> getApplicationsByJob(Integer jobId);

    
    // all applications submitted by a specific user 
    List<ApplicationResponse> getApplicationsByApplicant(Integer applicantId);

    
    // changes application status (accpetet | rejected)  --> returns updated app entity
    ApplicationResponse updateStatus(Integer id, ApplicationStatus status);

    
    // deletes an application by id
    void deleteApplication(Integer id);

    
    // fetches a application by id
    ApplicationResponse getById(Integer id);
}