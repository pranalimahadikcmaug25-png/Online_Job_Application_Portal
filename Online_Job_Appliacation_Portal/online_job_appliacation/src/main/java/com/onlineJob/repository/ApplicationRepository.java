package com.onlineJob.repository;

import com.onlineJob.entities.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository                        // Spring will create object of this interface and inject it into service layer

// the repository will manage Application entity, Integer (Primary key type)
public interface ApplicationRepository extends JpaRepository<Application, Integer> {

	// Internally Spring JPA generates SQL Query:
	// SELECT * FROM applications WHERE applicantId = ?
    List<Application> findByApplicant_Id(Integer applicantId);

    // SELECT * FROM applications WHERE jobId = ?
    List<Application> findByJob_Id(Integer jobId);

}