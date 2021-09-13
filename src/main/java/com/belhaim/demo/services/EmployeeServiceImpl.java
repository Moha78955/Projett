package com.belhaim.demo.services;

import java.util.List;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.belhaim.demo.exceptions.EmployeeNotFoundExcpetion;
import com.belhaim.demo.models.Employee;
import com.belhaim.demo.repository.EmployeeRepo;


@Service
public class EmployeeServiceImpl implements EmployeeService  {
	
	private final EmployeeRepo employeeRepo;
	
	@Autowired
	public EmployeeServiceImpl(EmployeeRepo employeerepo) {
		this.employeeRepo=employeerepo;
	}

	@Override
	public Employee addEmployee(Employee employee) {
		employee.setEmployeeCode(UUID.randomUUID().toString());
		return employeeRepo.save(employee);
	}

	@Override
	public List<Employee> findAllEmployees() {
		return employeeRepo.findAll();
	}

	@Override
	public Employee updateEmployee(Employee employee) {
		return employeeRepo.save(employee);
	}

	@Override
	@Transactional
	public void deleteEmployee(Long id) {
		employeeRepo.deleteEmployeeById(id);
		
	}

	@Override
	public Employee findEmployeeById(Long id) {
		return employeeRepo.findEmployeeById(id)
				.orElseThrow(()->new EmployeeNotFoundExcpetion("Employee by id" + id +" was not found"));
	}
	
	
	
	

}
