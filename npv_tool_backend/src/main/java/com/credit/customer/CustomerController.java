package com.credit.customer;
import com.credit.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/cbe/api/loan/customer")
@RestController
public class CustomerController {
    @Autowired
    private CustomerRepository customerRepository;
    @PostMapping("/")
    public ResponseEntity<?> registerCustomers(@Valid @RequestBody Customer customer){
        String registered_date = new SimpleDateFormat("yyyy:MM:dd:HH:mm:ss").format(Calendar.getInstance().getTime());
        Customer _customer = new Customer();
        _customer.setCustomerId(customer.getCustomerId());
        _customer.setGender(customer.getGender());
        _customer.setFirstName(customer.getFirstName());
        _customer.setMiddleName(customer.getMiddleName());
        _customer.setLastName(customer.getLastName());
        _customer.setPhoneNumber(customer.getPhoneNumber());
        _customer.setRegisterDate(registered_date);
        customerRepository.save(_customer);
        return new ResponseEntity<>(_customer, HttpStatus.CREATED);
    }
    @GetMapping("/")
    public ResponseEntity<List<Customer>> getAllCustomer() {
        List<Customer> customers = new ArrayList<>(customerRepository.findAll());
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Customer> getEmployeeById(@PathVariable Long id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
        return ResponseEntity.ok(customer);
    }
    @GetMapping("/{firstName}")
    public ResponseEntity<?> getAllManagers(@PathVariable("firstName") String firstName) {
        return new ResponseEntity<>(customerRepository.findByFirstName(firstName), HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCustomer(@PathVariable("id") Long id) {
        customerRepository.deleteById(id);
        return new ResponseEntity<>(id, HttpStatus.OK);
}
    @PutMapping("/{id}")
    public ResponseEntity<Customer> updateCustomer(@PathVariable Long id,@RequestBody Customer customerDetails) {
        Customer updateCustomer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id: " + id));
        updateCustomer.setFirstName(customerDetails.getFirstName());
        updateCustomer.setMiddleName(customerDetails.getMiddleName());
        updateCustomer.setLastName(customerDetails.getLastName());
        updateCustomer.setPhoneNumber(customerDetails.getPhoneNumber());
        customerRepository.save(updateCustomer);
        return ResponseEntity.ok(updateCustomer);
    }
}
