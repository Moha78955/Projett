package com.belhaim.demo.exceptions;

public class EmployeeNotFoundExcpetion extends RuntimeException {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public EmployeeNotFoundExcpetion(String message) {
		super(message);
	}

}