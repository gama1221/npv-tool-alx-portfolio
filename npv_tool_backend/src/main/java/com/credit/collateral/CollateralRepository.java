package com.credit.collateral;

import com.credit.loan.Loan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CollateralRepository extends JpaRepository<Collateral, Long> {
    List<Collateral> findByLoanCollateral(Loan id);
}