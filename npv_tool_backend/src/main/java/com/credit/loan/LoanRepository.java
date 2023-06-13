package com.credit.loan;
import com.credit.customer.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface LoanRepository extends JpaRepository<Loan, Long> {
List<Loan> findByCustomerLoan(Customer id);
}
