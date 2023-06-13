package com.credit.loan;
import com.credit.customer.Customer;
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
@RequestMapping("/cbe/api/loan/loan")
@RestController
public class LoanController {
    @Autowired
    private LoanRepository loanRepository;
    @PostMapping("/{customerId}")
    public ResponseEntity<?> registerManager(@Valid @RequestBody Loan loan, @PathVariable("customerId") Customer customerId){
        String registered_date = new SimpleDateFormat("yyyy:MM:dd:HH:mm:ss").format(Calendar.getInstance().getTime());
        Loan _loan = new Loan();
        _loan.setLoan_id(loan.getLoan_id());
        _loan.setType(loan.getType());
        _loan.setAmount(loan.getAmount());
        _loan.setAnnualInterestRate(loan.getAnnualInterestRate());
        _loan.setLoanPeriodsInYears(loan.getLoanPeriodsInYears());
        _loan.setNumberOfPayments(loan.getNumberOfPayments());
        _loan.setCustomerLoan(customerId);
        _loan.setRegisteredDate(registered_date);
        loanRepository.save(_loan);
        return new ResponseEntity<>(_loan, HttpStatus.CREATED);
    }
    @GetMapping("/")
    public ResponseEntity<List<Loan>> getAllLoan() {
        List<Loan> loans = new ArrayList<>(loanRepository.findAll());
        return new ResponseEntity<>(loans, HttpStatus.OK);
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateLoanDetails(@PathVariable("id") Long id, @RequestBody Loan loan) {
        Loan _loan = loanRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Not found coach with id = " + id));
        _loan.setType(loan.getType());
        loanRepository.save(_loan);
        return ResponseEntity.ok(_loan);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteLoan(@PathVariable("id") Long id) {
        loanRepository.deleteById(id);
        return new ResponseEntity<>(id, HttpStatus.OK);
    }
    @GetMapping("/{customerId}")
    public ResponseEntity<?> getAllLoanOnCustomer(@PathVariable("customerId") Customer customerId) {
        return new ResponseEntity<>(loanRepository.findByCustomerLoan(customerId), HttpStatus.OK);
    }
}
