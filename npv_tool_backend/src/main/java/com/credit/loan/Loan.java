package com.credit.loan;


import com.credit.collateral.Collateral;
import com.credit.customer.Customer;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name = "loan")
public class Loan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long loan_id;

    @Column(name = "type")
    private String type;
    @Column(name = "Amount")
    private String amount;
    @Column(name = "register_date")
    private String registeredDate;
    @Column(name = "annual_interest_rate")
    private Float annualInterestRate;
    @Column(name = "loan_periods_in_years")
    private Float loanPeriodsInYears;
    @Column(name = "risk_premium")
    private Float riskPremium;
    @Column(name = "number_of_payments")
    private Integer numberOfPayments;
    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "customerLoan", referencedColumnName = "id")
    @JsonIgnoreProperties("loans")
    private Customer customerLoan;

    @OneToMany(mappedBy = "loanCollateral")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnoreProperties("loanCollateral")
    private List<Collateral> collaterals = new ArrayList<>();
}