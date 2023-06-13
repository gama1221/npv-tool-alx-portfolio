package com.credit.collateral;

import com.credit.exception.ResourceNotFoundException;
import com.credit.loan.Loan;
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
@RequestMapping("/cbe/api/loan/collateral")
@RestController
public class CollateralController {
    @Autowired
    private CollateralRepository collateralRepository;
    @PostMapping("/{loan}")
    public ResponseEntity<?> registerManager(@Valid @RequestBody Collateral collateral, @PathVariable("loan") Loan loan){
        String registered_date = new SimpleDateFormat("yyyy:MM:dd:HH:mm:ss").format(Calendar.getInstance().getTime());
        Collateral _collateral = new Collateral();
        _collateral.setType(collateral.getType());
        _collateral.setValue(collateral.getValue());
        _collateral.setRegisterDate(registered_date);
        _collateral.setLoanCollateral(loan);
        collateralRepository.save(_collateral);
        return new ResponseEntity<>(_collateral, HttpStatus.CREATED);
    }
    @GetMapping("/")
    public ResponseEntity<List<Collateral>> getAllCollateral() {
        List<Collateral> collaterals = new ArrayList<>(collateralRepository.findAll());
        return new ResponseEntity<>(collaterals, HttpStatus.OK);
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCollateralDetails(@PathVariable("id") Long id, @RequestBody Collateral collateral) {
        Collateral _collateral = collateralRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Not found coach with id = " + id));
        _collateral.setType(collateral.getType());
        _collateral.setValue(collateral.getValue());
        collateralRepository.save(_collateral);
        return ResponseEntity.ok(_collateral);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCollateral(@PathVariable("id") Long id) {
        collateralRepository.deleteById(id);
        return new ResponseEntity<>(id, HttpStatus.OK);
    }
    @GetMapping("/{loanId}")
    public ResponseEntity<?> getAllLoanOnCustomer(@PathVariable("loanId") Loan loanId) {
        return new ResponseEntity<>(collateralRepository.findByLoanCollateral(loanId), HttpStatus.OK);
    }
}