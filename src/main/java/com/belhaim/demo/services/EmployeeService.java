package com.belhaim.demo.services;

import java.util.List;

import com.belhaim.demo.models.Employee;



public interface EmployeeService {
	
	public Employee addEmployee(Employee employee);
	
	public List<Employee>findAllEmployees();
	
	public Employee updateEmployee(Employee employee) ;
	
	public void deleteEmployee(Long id);
	
	public Employee findEmployeeById(Long id);

}
