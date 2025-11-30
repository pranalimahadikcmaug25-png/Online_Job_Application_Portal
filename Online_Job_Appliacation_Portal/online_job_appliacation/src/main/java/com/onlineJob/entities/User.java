package com.onlineJob.entities;


	
	import com.onlineJob.enums.Userenums;

import jakarta.persistence.*;
	import lombok.*;
	
	@Entity
	@Table(name = "users")
	@Getter
	@Setter
	@NoArgsConstructor
	@AllArgsConstructor
	@Builder
	public class User {

	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Integer id;

	    @Column(nullable = false)
	    private String name;

	    @Column(nullable = false, unique = true)
	    private String email;

	    @Column(nullable = false)
	    private String password;  // Hash this in service layer

	    @Enumerated(EnumType.STRING)
	    @Column(nullable = false)
	    private Userenums role;

	    @Column
	    private String phone;


	    @Column(columnDefinition = "TEXT")
	    private String bio;

	    @Column(columnDefinition = "TEXT")
	    private String skills;

	    @Column(columnDefinition = "TEXT")
	    private String education;

	    @Column(columnDefinition = "TEXT")
	    private String experience;

	    @Column
	    private String resumeUrl;

	    @Column
	    private String companyName;

	    @Column
	    private String companyWebsite;

	    @Column(nullable = false)
	    private Boolean isActive = true;

	    @Column(nullable = false, updatable = false)
	    private java.time.LocalDateTime createdAt = java.time.LocalDateTime.now();

	    
	}



