package com.onlineJob.CustomException;

public class InvalidInputException extends RuntimeException {
	public InvalidInputException(String mesg) {
		super(mesg);
	}

}