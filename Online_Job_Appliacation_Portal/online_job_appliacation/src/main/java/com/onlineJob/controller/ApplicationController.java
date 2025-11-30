package com.onlineJob.controller;


	

	import com.onlineJob.dto.ApplicationRequest;
	import com.onlineJob.dto.ApplicationResponse;
	import com.onlineJob.enums.ApplicationStatus;
	import com.onlineJob.service.ApplicationService;
	import org.springframework.web.bind.annotation.*;

	import java.util.List;

	@RestController // Must be @RestController, not @Controller
	@RequestMapping("/applications")
	@CrossOrigin(origins = "http://localhost:3000")
	public class ApplicationController {

	    private final ApplicationService service;

	    public ApplicationController(ApplicationService service) {
	        this.service = service;
	    }

	    @PostMapping
	    public ApplicationResponse apply(@RequestBody ApplicationRequest req) {
	        return service.apply(req);
	    }

	    @GetMapping("/job/{jobId}")
	    
	    public List<ApplicationResponse> getByJob(@PathVariable Integer jobId) {
	        return service.getApplicationsByJob(jobId);
	    }

	    @GetMapping("/applicant/{applicantId}")
	    public List<ApplicationResponse> getByApplicant(@PathVariable Integer applicantId) {
	        return service.getApplicationsByApplicant(applicantId);
	    }

	    @GetMapping("/{id}")
	    public ApplicationResponse getById(@PathVariable Integer id) {
	        return service.getById(id);
	    }

	    @PutMapping("/{id}/status")
	    public ApplicationResponse updateStatus(@PathVariable Integer id, @RequestParam ApplicationStatus status) {
	        return service.updateStatus(id, status);
	    }

	    @DeleteMapping("/{id}")
	    public void delete(@PathVariable Integer id) {
	        service.deleteApplication(id);
	    }
	}


